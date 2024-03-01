from marshmallow import Schema, fields


class BookSchema(Schema):
    id = fields.Integer(dump_only=True)
    image = fields.Str(required=True)
    title = fields.Str(required=True)
    author = fields.Str(required=True)
    rating = fields.Float(required=True)
    description = fields.Str(required=True)
    genres = fields.List(fields.Str(), required=True)
