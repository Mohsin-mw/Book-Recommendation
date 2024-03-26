from sqlalchemy import func

from database.db import db


class BookRequestsModel(db.Model):
    __tablename__ = "book_requests"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), unique=True, nullable=False)
    isbn = db.Column(db.String(255), unique=True, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=func.now())