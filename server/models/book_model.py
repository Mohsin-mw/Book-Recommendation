from database.db import db


class BookModel(db.Model):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    description = db.Column(db.String(255))
    author = db.Column(db.String(255))
    publication = db.Column(db.String(255))
    isbn = db.Column(db.Text)
    pages = db.Column(db.String(255))
    image = db.Column(db.String(255))
