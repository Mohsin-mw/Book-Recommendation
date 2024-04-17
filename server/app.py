from flask import Flask
from flask_smorest import Api
from database.db import db
import models
from resources.Book import blp as BookBlueprint
from resources.User import user_blp as UserBlueprint
from resources.UserFavorites import blp as UserFavorites
from resources.Comments import comment_blp as CommentBlueprint
from resources.WishList import blp as WishList
from flask_migrate import Migrate
from flask_cors import CORS

def create_app(db_url=None):
    # Create a Flask application instance
    app = Flask(__name__)
    CORS(app)
    # Configure the application to propagate exceptions
    app.config["PROPAGATE_EXCEPTIONS"] = True

    # Configure API title, version, and OpenAPI version
    app.config["API_TITLE"] = "Book Recommendation API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"

    # Configure OpenAPI settings
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

    # Configure Database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://masterUsername:JohnCena2023&@tmulbdb.cjikgyue6il0.eu-west-3.rds.amazonaws.com:5432/TMUL_DB'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    migrate = Migrate(app, db)

    api = Api(app)

    with app.app_context():
        db.create_all()

    api.register_blueprint(BookBlueprint)
    api.register_blueprint(UserBlueprint)
    api.register_blueprint(UserFavorites)
    api.register_blueprint(CommentBlueprint)
    api.register_blueprint(WishList)

    return app
