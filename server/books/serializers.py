from rest_framework import serializers
from books.models import Book, Favorites, Comment, WishList, RequestBook


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'isbn', 'image', 'description']


class UserBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"


class FavoriteSerializer(serializers.ModelSerializer):
    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())

    class Meta:
        model = Favorites
        fields = ['id', 'user', 'book']


class FavoriteByUserSerializer(serializers.ModelSerializer):
    book = BookSerializer()

    class Meta:
        model = Favorites
        fields = ['id', 'book']


class WishListByUserSerializer(serializers.ModelSerializer):
    book = BookSerializer()

    class Meta:
        model = Favorites
        fields = ['id', 'book']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


class WishListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishList
        fields = "__all__"


class BookRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestBook
        fields = "__all__"
