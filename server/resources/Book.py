from flask import request, jsonify
from flask.views import MethodView
from flask_smorest import Blueprint
from models.book_model import BookModel
from database.db import db
from schema.schemas import BookSchema

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
    @blp.response(200, BookSchema)
    def get(self):
        try:
            # Get the genre from the request query parameters
            genre = request.args.get('genre')

            # Query books with the specified genre using SQLAlchemy
            if genre:
                books = BookModel.query.filter(BookModel.genres.like(f'%{genre}%')).all()
            else:
                books = BookModel.query.all()

            # Convert each BookModel object into a dictionary representation
            books_dict = [create_book_dict(book) for book in books]

            serialized_books = BookSchema(many=True).dump(books_dict)

            # Serialize the list of dictionaries into JSON format
            return jsonify({"items": len(books), "data": serialized_books})
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
