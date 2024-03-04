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


@blp.route("/books")
class Book(MethodView):
    # @blp.response(200, BookSchema)
    # @blp.response(200, BookSchema)
    def get(self):
        try:
            query = request.args.get('query')
            if query:
                books = BookModel.query.filter(BookModel.title.ilike(f'%{query}%')).all()
            else:
                books = BookModel.query.all()

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


@blp.route("/books/<int:bookId>")
class BooksById(MethodView):
    @blp.response(200, BookSchema)
    def get(self, bookId):
        try:
            book = BookModel.query.get(bookId)
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
