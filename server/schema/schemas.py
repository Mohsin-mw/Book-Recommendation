from marshmallow import Schema, fields


class ItemSchema(Schema):
    id = fields.Str(required=True, dump_only=True)
    image = fields.Str(required=True)
    title = fields.Str(required=True)
    author = fields.Str(required=True)
    rating = fields.Float(required=True)
    description = fields.Str(required=True)
    genre = fields.Str(required=True)
