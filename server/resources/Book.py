from flask import request, jsonify
from flask.views import MethodView
from flask_smorest import Blueprint
from models.book_model import BookModel
from database.db import db
from schema.schemas import BookSchema
import pickle

# Importing trained Model
new_data = pickle.load(open('algorithm/movies_list.pkl', 'rb'))
similarity = pickle.load(open('algorithm/similarity.pkl', 'rb'))


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


blp = Blueprint("books", __name__, description="This endpoint is responsible for fetching books by genre or "
                                               "category and recommending books as well")


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


@blp.route("/api/books")
class Book(MethodView):
    # @blp.response(200, BookSchema)
    # @blp.response(200, BookSchema)
    def get(self):
        try:
            query = request.args.get('query')
            if query:
                # Query books and limit the result to 7
                books = BookModel.query.filter(BookModel.title.ilike(f'%{query}%')).limit(7).all()
            else:
                # Query all books and limit the result to 7
                books = BookModel.query.limit(7).all()

            # Serialize books
            books_dict = [create_book_dict(book) for book in books]
            serialized_books = BookSchema(many=True).dump(books_dict)

            return jsonify({"items": len(books_dict), "data": serialized_books})
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @blp.arguments(BookSchema)
    @blp.response(200, BookSchema)
    def post(self, *args, **kwargs):
        try:
            data = request.get_json()
            required_fields = ["image", "title", "author", "rating", "description", "genres"]
            if not all(field in data for field in required_fields):
                return jsonify({"error": "Missing required fields"}), 400

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

            return jsonify({"book": serialized_book})
        except Exception as e:
            return jsonify({"error": str(e)}), 500


@blp.route("/books/<string:bookTitle>")
class BooksById(MethodView):
    @blp.response(200, BookSchema)
    def get(self, bookTitle):
        try:
            book = BookModel.query.filter_by(title=bookTitle).first()
            if not book:
                return jsonify({"error": "Book not found"}), 404

            serialized_book = BookSchema().dump(book)
            serialized_book["genres"] = format_genres(book.genres)

            return jsonify({"book": serialized_book})

        except Exception as e:
            return jsonify({"error": str(e)}), 500


@blp.route("/recommendations")
class Recommendations(MethodView):
    def post(self, *args, **kwargs):
        try:
            data = request.get_json()
            recommended_books = recommend(data['title'], num_recommendations=10)
            return {"books": recommended_books}
        except Exception as e:
            return jsonify({"error": str(e)}), 500


@blp.route("/api/books/genres/<string:genre>")
class BooksByGenre(MethodView):
    def get(self, genre):
        try:
            page = int(request.args.get('page', 1))  # Default page is 1 if not provided
            per_page = int(request.args.get('per_page', 10))  # Default per_page is 10 if not provided

            # Query for books based on the genre
            query = BookModel.query.filter(BookModel.genres.like(f'%{genre}%'))

            # Paginate the query results
            paginated_books = query.paginate(page=page, per_page=per_page, error_out=False)

            # Serialize the paginated books
            books_dict = [create_book_dict(book) for book in paginated_books.items]
            serialized_books = BookSchema(many=True).dump(books_dict)

            # Construct pagination metadata
            pagination = {
                "total_books": paginated_books.total,
                "total_pages": paginated_books.pages,
                "current_page": paginated_books.page,
                "per_page": paginated_books.per_page,
                "has_next": paginated_books.has_next,
                "has_prev": paginated_books.has_prev
            }

            return jsonify({"books": serialized_books, "pagination": pagination})
        except Exception as e:
            return jsonify({"error": str(e)}), 500
