from datetime import datetime
from math import ceil

from flask import request, jsonify
from flask.views import MethodView
from flask_smorest import Blueprint
from models.book_model import BookModel
from models.book_requests_model import BookRequestsModel
from database.db import db
from schema.schemas import BookSchema, RequestSchema
import pickle

# Importing trained Model
new_data = pickle.load(open('algorithm/movies_list.pkl', 'rb'))
similarity = pickle.load(open('algorithm/similarity.pkl', 'rb'))


# Recommendation method from trained model
def recommend(title, num_recommendations=10):
    index = new_data[new_data['Title'] == title].index[0]
    distance = sorted(enumerate(similarity[index]), reverse=True, key=lambda vector: vector[1])
    recommendations = []
    for i in distance[1:num_recommendations + 1]:
        book_info = new_data.iloc[i[0]]
        recommendations.append({
            'Title': book_info.Title,
            'Author': book_info.Author,
            'Rating': book_info.Rating,
            'Description': book_info.Description,
            'Genres': book_info.Genres,
            'Image': book_info.Image
        })
    return recommendations


def lowercase_keys(obj):
    if isinstance(obj, dict):
        return {key.lower(): lowercase_keys(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [lowercase_keys(item) for item in obj]
    else:
        return obj


# Blueprint definition
blp = Blueprint("books", __name__,
                description="This endpoint is responsible for fetching books by genre or category and recommending books as well")


def format_genres(genres):
    if not genres:
        return []
    return [genre.strip().strip("'") for genre in genres.strip("[]").split(",")]


def create_book_dict(book):
    return {
        "id": book.id,
        "image": book.image,
        "title": book.title,
        "author": book.author,
        "rating": book.rating,
        "description": book.description,
        "genres": format_genres(book.genres)
    }


def make_response(data=None, error=None, status=200):
    response = {"data": data} if data else {}
    if error:
        response["error"] = error
    return jsonify(response), status


@blp.route("/api/books")
class Book(MethodView):
    def get(self):
        try:
            query = request.args.get('query')
            title = request.args.get('title')
            if query:
                books = BookModel.query.filter(BookModel.title.ilike(f'%{query}%')).limit(7).all()
            elif title:
                book = BookModel.query.filter_by(title=title).first()
                if not book:
                    return make_response(error="Book not found", status=404)
                serialized_book = BookSchema().dump(book)
                serialized_book["genres"] = format_genres(book.genres)
                return make_response(data={"book": serialized_book}, status=200)
            else:
                books = BookModel.query.limit(7).all()

            books_dict = [create_book_dict(book) for book in books]
            serialized_books = BookSchema(many=True).dump(books_dict)

            return make_response(data={"items": len(books_dict), "books": serialized_books})

        except Exception as e:
            return make_response(error=str(e), status=500)

    @blp.arguments(BookSchema)
    def post(self, *args, **kwargs):
        try:
            data = request.get_json()
            required_fields = ["image", "title", "author", "rating", "description", "genres"]
            if not all(field in data for field in required_fields):
                return make_response(error="Missing required fields", status=400)

            new_book = BookModel(
                image=data["image"],
                title=data["title"],
                author=data["author"],
                rating=data["rating"],
                description=data["description"],
                genres=", ".join(data["genres"])
            )

            db.session.add(new_book)
            db.session.commit()

            book_dict = create_book_dict(new_book)
            serialized_book = BookSchema().dump(book_dict)

            return make_response(data={"book": serialized_book})

        except Exception as e:
            return make_response(error=str(e), status=500)


@blp.route("/books/<string:bookTitle>")
class BooksById(MethodView):
    def get(self, bookTitle):
        try:
            book = BookModel.query.filter_by(title=bookTitle).first()
            if not book:
                return make_response(error="Book not found", status=404)

            serialized_book = BookSchema().dump(book)
            serialized_book["genres"] = format_genres(book.genres)

            return make_response(data={"book": serialized_book})

        except Exception as e:
            return make_response(error=str(e), status=500)


@blp.route("/api/recommendations")
class Recommendations(MethodView):
    def post(self, *args, **kwargs):
        try:
            data = request.get_json()
            recommended_books = recommend(data['title'], num_recommendations=30)
            lowercase_books = lowercase_keys(recommended_books)

            # Pagination parameters
            page = request.args.get('page', 1, type=int)
            per_page = request.args.get('per_page', 10, type=int)

            # Calculate start and end index for pagination
            start_index = (page - 1) * per_page
            end_index = min(start_index + per_page, len(lowercase_books))

            # Extract the subset of recommended books for the current page
            paginated_books = lowercase_books[start_index:end_index]

            # Calculate total number of pages
            total_pages = ceil(len(lowercase_books) / per_page)

            # Prepare pagination metadata
            pagination = {
                "current_page": page,
                "total_pages": total_pages,
                "per_page": per_page,
                "total_books": len(lowercase_books)
            }

            return make_response(data={"books": paginated_books, "pagination": pagination})
        except Exception as e:
            return make_response(error=str(e), status=500)


@blp.route("/api/books/genres/<string:genre>")
class BooksByGenre(MethodView):
    def get(self, genre):
        try:
            page = int(request.args.get('page', 1))
            per_page = int(request.args.get('per_page', 10))

            query = BookModel.query.filter(BookModel.genres.like(f'%{genre}%'))
            paginated_books = query.paginate(page=page, per_page=per_page, error_out=False)

            books_dict = [create_book_dict(book) for book in paginated_books.items]
            serialized_books = BookSchema(many=True).dump(books_dict)

            pagination = {
                "total_books": paginated_books.total,
                "total_pages": paginated_books.pages,
                "current_page": paginated_books.page,
                "per_page": paginated_books.per_page,
                "has_next": paginated_books.has_next,
                "has_prev": paginated_books.has_prev
            }

            return make_response(data={"books": serialized_books, "pagination": pagination})

        except Exception as e:
            return make_response(error=str(e), status=500)


@blp.route("/api/books/top-rated", methods=['GET'])
class TopRatedBooks(MethodView):
    def get(self):
        try:
            # Get the top 10 rated books from the database
            top_rated_books = BookModel.query.order_by(BookModel.rating.desc()).limit(10).all()

            # Serialize the top rated books
            serialized_books = [create_book_dict(book) for book in top_rated_books]

            # Return the serialized top rated books
            return make_response(data={"top_rated_books": serialized_books})

        except Exception as e:
            return make_response(error=str(e), status=500)


@blp.route("/api/books/all", methods=['GET'])
class AllBooks(MethodView):
    def get(self):
        try:
            # Pagination parameters
            page = request.args.get('page', 1, type=int)
            per_page = request.args.get('per_page', 10, type=int)

            # Query all books from the database
            all_books = BookModel.query.paginate(page=page, per_page=per_page, error_out=False)

            # Serialize the books
            serialized_books = [create_book_dict(book) for book in all_books.items]

            # Prepare pagination metadata
            pagination = {
                "total_books": all_books.total,
                "total_pages": all_books.pages,
                "current_page": all_books.page,
                "per_page": all_books.per_page,
                "has_next": all_books.has_next,
                "has_prev": all_books.has_prev
            }

            # Return the serialized books with pagination metadata
            return make_response(data={"books": serialized_books, "pagination": pagination})

        except Exception as e:
            return make_response(error=str(e), status=500)


@blp.route("/api/books/<int:book_id>", methods=['GET', 'PUT', 'DELETE'])
class SingleBookByTitle(MethodView):
    def get(self, book_id):
        try:
            # Query the book by its title
            book = BookModel.query.filter_by(id=book_id).first()

            # If the book doesn't exist, return an error
            if not book:
                return make_response(error="Book not found", status=404)

            # Serialize the book
            serialized_book = create_book_dict(book)

            # Return the serialized book
            return make_response(data={"book": serialized_book})

        except Exception as e:
            return make_response(error=str(e), status=500)

    def put(self, book_id):
        try:
            book = BookModel.query.filter_by(id=book_id).first()
            if not book:
                return make_response(error="Book not found", status=404)

            data = request.get_json()
            if not data:
                return make_response(error="No data provided for update", status=400)

            # Update only the fields that are provided in the request
            for key, value in data.items():
                setattr(book, key, value)

            db.session.commit()

            updated_book = BookModel.query.filter_by(id=book_id).first()  # Use book_title here
            serialized_book = BookSchema().dump(updated_book)

            return make_response(data={"updated_book": serialized_book})

        except Exception as e:
            return make_response(error=str(e), status=500)

    def delete(self, book_id):
        try:
            # Query the book by its title
            book = BookModel.query.filter_by(id=book_id).first()

            # If the book doesn't exist, return an error
            if not book:
                return make_response(error="Book not found", status=404)

            # Delete the book from the database
            db.session.delete(book)
            db.session.commit()

            # Return success message
            return make_response(data={"message": "Book deleted successfully"})

        except Exception as e:
            return make_response(error=str(e), status=500)


request_schema = RequestSchema()


@blp.route("/api/requests")
class Requests(MethodView):
    def post(self):
        try:
            data = request.get_json()
            if not data:
                return make_response(error="No data", status=400)
            current_timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:00')
            new_request = BookRequestsModel(title=data["title"], isbn=data["isbn"], timestamp=current_timestamp)
            db.session.add(new_request)
            db.session.commit()
            serialized_request = request_schema.dump(new_request)
            return make_response(data={"request": serialized_request}, status=200)
        except Exception as e:
            return make_response(error=str(e), status=500)
