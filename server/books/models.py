from django.db import models
from user.models import User


class Book(models.Model):
    class Meta:
        db_table = 'books'

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=300)
    description = models.TextField(max_length=800, default='')
    author = models.CharField(max_length=100)
    publication = models.CharField(max_length=100)
    isbn = models.CharField(max_length=100)
    pages = models.PositiveIntegerField(default=0)
    image = models.CharField(max_length=200)

    def __str__(self):
        return self.title


class RequestBook(models.Model):
    class Meta:
        db_table = 'book_requests'

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=300)
    isbn = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)

    def formatted_timestamp(self):
        return self.timestamp.strftime('%Y-%m-%dT%H:%M:%S')

    def __str__(self):
        return f"{self.title} | {self.timestamp}"



class Favorites(models.Model):
    class Meta:
        db_table = 'user_favorite'

    id = models.AutoField(primary_key=True)
    user = models.CharField(max_length=700)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id}"


class WishList(models.Model):
    class Meta:
        db_table = 'wish_list'

    id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=700)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id}"


class Comment(models.Model):
    class Meta:
        db_table = 'comments'

    comment_id = models.AutoField(primary_key=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user_id = models.CharField(max_length=700)
    user_name = models.CharField(max_length=500, default="Anonymous")
    comment_text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.comment_text

    def formatted_timestamp(self):
        return self.timestamp.strftime('%Y-%m-%dT%H:%M:%S')
