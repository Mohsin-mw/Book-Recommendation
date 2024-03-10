from flask import request, jsonify
from flask.views import MethodView
from flask_smorest import Blueprint
from models.user_model import UserModel
from database.db import db
from schema.schemas import UserSchema

# Blueprint definition
user_blp = Blueprint("users", __name__, url_prefix="/api/users",
                     description="This endpoint is responsible for user operations")

# Schema
user_schema = UserSchema()
users_schema = UserSchema(many=True)


def make_response(data=None, error=None, status=200):
    response = {"data": data} if data else {}
    if error:
        response["error"] = error
    return jsonify(response), status


@user_blp.route("/")
class Users(MethodView):
    def get(self):
        try:
            users = UserModel.query.all()
            serialized_users = users_schema.dump(users)
            return make_response(data={"users": serialized_users})
        except Exception as e:
            return make_response(error=str(e), status=500)

    @user_blp.arguments(user_schema)
    def post(self, data):
        try:
            existing_user = UserModel.query.filter_by(clerk_id=data['clerk_id']).first()
            if existing_user:
                return make_response(error="User with the same clerk_id already exists", status=400)

            new_user = UserModel(username=data['username'], clerk_id=data['clerk_id'])
            db.session.add(new_user)
            db.session.commit()
            serialized_user = user_schema.dump(new_user)
            return make_response(data={"user": serialized_user}, status=201)
        except Exception as e:
            return make_response(error=str(e), status=500)


@user_blp.route("/<int:user_id>")
class UsersById(MethodView):
    def get(self, user_id):
        try:
            user = UserModel.query.get(user_id)
            if not user:
                return make_response(error="User not found", status=404)
            serialized_user = user_schema.dump(user)
            return make_response(data={"user": serialized_user})
        except Exception as e:
            return make_response(error=str(e), status=500)

    def delete(self, user_id):
        try:
            user = UserModel.query.get(user_id)
            if not user:
                return make_response(error="User not found", status=404)
            db.session.delete(user)
            db.session.commit()
            return make_response(data={"message": "User deleted successfully"})
        except Exception as e:
            return make_response(error=str(e), status=500)

    @user_blp.arguments(user_schema)
    def put(self, data, user_id):
        try:
            user = UserModel.query.get(user_id)
            if not user:
                return make_response(error="User not found", status=404)
            user.username = data['username']
            user.clerk_id = data['clerk_id']
            db.session.commit()
            serialized_user = user_schema.dump(user)
            return make_response(data={"user": serialized_user})
        except Exception as e:
            return make_response(error=str(e), status=500)
