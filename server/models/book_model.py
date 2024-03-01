from database.db import db


class BookModel(db.Model):

    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(255))
    title = db.Column(db.String(255))
    author = db.Column(db.String(255))
    rating = db.Column(db.Float)
    description = db.Column(db.Text)
    genres = db.Column(
        db.String(255))


