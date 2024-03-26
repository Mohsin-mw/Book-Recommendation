from marshmallow import Schema, fields, validate


class BookSchema(Schema):
    id = fields.Integer(dump_only=True)
    image = fields.Str(required=True)
    title = fields.Str(required=True)
    author = fields.Str(required=True)
    rating = fields.Float(required=True)
    description = fields.Str(required=True)
    genres = fields.List(fields.Str(), required=True)


class UserSchema(Schema):
    id = fields.Integer(dump_only=True)
    username = fields.Str(required=True)
    clerk_id = fields.Str(required=True)


class UserFavoriteSchema(Schema):
    id = fields.Integer(dump_only=True)
    user_id = fields.Str(required=True)
    book_id = fields.Integer(required=True)


class CommentSchema(Schema):
    comment_id = fields.Int(dump_only=True)
    book_id = fields.Int(required=True)
    user_id = fields.Str(required=True, validate=validate.Length(max=255))
    user_name = fields.Str(required=True, validate=validate.Length(max=255))
    comment_text = fields.Str(required=True)
    timestamp = fields.DateTime(dump_only=True)


class RequestSchema(Schema):
    id = fields.Integer(dump_only=True)
    title = fields.Str(required=True)
    isbn = fields.Str(required=True)
