from database.db import db
from datetime import datetime


class CommentModel(db.Model):
    __tablename__ = 'comments'

    comment_id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    user_id = db.Column(db.String(255), nullable=False)
    comment_text = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
