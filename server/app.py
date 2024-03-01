import os

# ADD VALIDATION


from flask import Flask
from flask_smorest import Api
from database.db import db
import models
from resources.Book import blp as BookBlueprint


def create_app(db_url=None):
    # Create a Flask application instance
    app = Flask(__name__)

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
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url or os.getenv('DATABASE_URL', 'sqlite:///data.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    # Create an API instance
    api = Api(app)

    with app.app_context():
        db.create_all()

    # Register the BookBlueprint blueprint with the API
    api.register_blueprint(BookBlueprint)

    return app
