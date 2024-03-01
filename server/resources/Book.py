from json import dumps

from flask import request, jsonify
from flask.views import MethodView
from flask_smorest import Blueprint
from models.book_model import BookModel
from database.db import db
from schema.schemas import BookSchema


blp = Blueprint("books", __name__, description="This endpoint of responsible for fetching books by genre or "
                                               "category and to recommend books as well")


@blp.route("/books")
class Book(MethodView):
    @blp.response(200, BookSchema)
    def get(self):
        # Query all books from the database
        books = BookModel.query.all()

        # Convert each BookModel object into a dictionary representation
        books_dict = []
        for book in books:
            book_dict = {
                "id": book.id,
                "image": book.image,
                "title": book.title,
                "author": book.author,
                "rating": book.rating,
                "description": book.description,
                "genres": book.genres.split(", ") if book.genres else []  # Convert genres string to list
            }
            books_dict.append(book_dict)

        serialized_books = BookSchema(many=True).dump(books_dict)

        # Serialize the list of dictionaries into JSON format
        return jsonify({"items": len(books), "data": serialized_books})

    @blp.arguments(BookSchema)
    @blp.response(200, BookSchema)
    def post(self, *args, **kwargs):
        data = request.get_json()

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

        book_dict = {
            "id": new_book.id,
            "image": new_book.image,
            "title": new_book.title,
            "author": new_book.author,
            "rating": new_book.rating,
            "description": new_book.description,
            "genres": new_book.genres.split(", ")
        }

        serialized_book = BookSchema().dump(book_dict)

        return jsonify({"book": serialized_book})
