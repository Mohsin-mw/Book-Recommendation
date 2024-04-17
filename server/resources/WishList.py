from flask import request, jsonify
from flask.views import MethodView
from flask_smorest import Blueprint
from database.db import db
from models.wish_model import WishList
from models.user_model import UserModel
from models.book_model import BookModel


# Blueprint definition
blp = Blueprint("whish_list", __name__)


@blp.route("/api/wishList")
class UserFavorites(MethodView):

    def post(self, *args, **kwargs):
        data = request.get_json()
        print(data)
        clerk_id = data.get('clerk_id')  # Use clerk_id instead of user_id
        book_id = data.get('book_id')

        # Check if the user and book exist
        user = UserModel.query.filter_by(clerk_id=clerk_id).first()  # Query UserModel by clerk_id
        book = BookModel.query.get(book_id)
        if not user or not book:
            return jsonify({'message': 'User or book not found'}), 404

        # Check if the favorite already exists
        existing_favorite = WishList.query.filter_by(user_id=user.clerk_id, book_id=book_id).first()
        if existing_favorite:
            return jsonify({'message': 'Already In WishList'}), 409

        # Create a new favorite
        new_favorite = WishList(user_id=user.clerk_id, book_id=book_id)
        db.session.add(new_favorite)
        db.session.commit()

        return jsonify({'message': 'Book Added To WishList'}), 201


@blp.route("/api/userWishList")
class UserFavoritesList(MethodView):
    def post(self):
        data = request.get_json()
        clerk_id = data.get('clerk_id')

        if not clerk_id:
            return jsonify({'message': 'clerk_id not provided in the request body'}), 400

        # Find the user based on the clerk_id
        user = UserModel.query.filter_by(clerk_id=clerk_id).first()
        if not user:
            return jsonify({'message': 'User not found'}), 404

        # Find all favorite books of the user
        user_favorites = WishList.query.filter_by(user_id=clerk_id).all()

        # Collect book information for each favorite book
        whish_list = []
        for favorite in user_favorites:
            book = BookModel.query.get(favorite.book_id)
            if book:
                whish_list.append({
                    'title': book.title,
                    'author': book.author,
                    'image': book.image,
                    'id': book.id
                    # Include other book information you want to return
                })

        return jsonify({'whish_list': whish_list}), 200

    def delete(self):
        data = request.get_json()
        clerk_id = data.get('clerk_id')
        book_id = data.get('book_id')

        if not clerk_id:
            return jsonify({'message': 'clerk_id not provided in the request body'}), 400
        if not book_id:
            return jsonify({'message': 'book_id not provided in the request body'}), 400

        # Find the user based on the clerk_id
        user = UserModel.query.filter_by(clerk_id=clerk_id).first()
        if not user:
            return jsonify({'message': 'User not found'}), 404

        # Find the user favorite entry for the given book
        favorite = WishList.query.filter_by(user_id=clerk_id, book_id=book_id).first()
        if not favorite:
            return jsonify({'message': 'Book not found in user favorites'}), 404

        # Delete the user favorite entry
        db.session.delete(favorite)
        db.session.commit()

        return jsonify({'message': 'Book removed from user favorites'}), 200
