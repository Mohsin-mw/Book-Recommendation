from flask import jsonify, request
from flask_smorest import Blueprint
from flask.views import MethodView
from database.db import db
from models.comment_model import CommentModel
from schema.schemas import CommentSchema

comment_blp = Blueprint("comments", __name__, description="This endpoint is responsible for user operations")

comment_schema = CommentSchema()
comments_schema = CommentSchema(many=True)


def make_response(data=None, error=None, status=200):
    response = {"data": data} if data else {}
    if error:
        response["error"] = error
    return jsonify(response), status


@comment_blp.route("/api/comments")
class Comments(MethodView):
    def post(self):
        try:
            data = request.json
            existing_comment = CommentModel.query.filter_by(
                book_id=data['book_id'],
                user_id=data['user_id']
            ).first()
            if existing_comment:
                # Handle case where a comment already exists for this user and book
                return make_response(error="A comment already exists for this user and book", status=400)

            new_comment = CommentModel(
                book_id=data['book_id'],
                user_id=data['user_id'],
                user_name=data['user_name'],  # Add user_name field
                comment_text=data['comment_text']
            )
            db.session.add(new_comment)
            db.session.commit()
            serialized_comment = comment_schema.dump(new_comment)
            return make_response(data={"comment": serialized_comment}, status=201)
        except Exception as e:
            return make_response(error=str(e), status=500)

    def get(self):
        try:
            # Get query parameters from the request
            book_id = request.args.get('book_id')
            user_id = request.args.get('user_id')

            # Query comments based on the provided criteria
            if book_id:
                comments = CommentModel.query.filter_by(book_id=book_id).all()
            elif user_id:
                comments = CommentModel.query.filter_by(user_id=user_id).all()
            else:
                comments = CommentModel.query.all()

            # Serialize the comments
            serialized_comments = comments_schema.dump(comments)

            return make_response(data={"comments": serialized_comments})
        except Exception as e:
            return make_response(error=str(e), status=500)


@comment_blp.route("/api/comments/<int:comment_id>", methods=["PUT"])
class Comment(MethodView):
    def put(self, comment_id):
        try:
            # Retrieve the comment to be updated
            comment = CommentModel.query.get(comment_id)
            if not comment:
                return make_response(error="Comment not found", status=404)

            # Extract data from the request
            data = request.json

            # Update the comment fields
            comment.comment_text = data.get('comment_text', comment.comment_text)

            # Commit changes to the database
            db.session.commit()

            # Serialize the updated comment
            serialized_comment = comment_schema.dump(comment)

            return make_response(data={"comment": serialized_comment})
        except Exception as e:
            return make_response(error=str(e), status=500)


@comment_blp.route("/api/comments/<int:comment_id>", methods=["DELETE"])
class Comment(MethodView):
    def delete(self, comment_id):
        try:
            # Retrieve the comment to be deleted
            comment = CommentModel.query.get(comment_id)
            if not comment:
                return make_response(error="Comment not found", status=404)

            # Delete the comment
            db.session.delete(comment)
            db.session.commit()

            return make_response(data={"message": "Comment deleted successfully"})
        except Exception as e:
            return make_response(error=str(e), status=500)

@comment_blp.route("/api/comments/book/<int:book_id>", methods=["GET"])
class CommentsByBook(MethodView):
    def get(self, book_id):
        try:
            # Query comments associated with the specified book ID
            comments = CommentModel.query.filter_by(book_id=book_id).all()

            # Serialize the comments
            serialized_comments = comments_schema.dump(comments)

            return make_response(data={"comments": serialized_comments})
        except Exception as e:
            return make_response(error=str(e), status=500)
