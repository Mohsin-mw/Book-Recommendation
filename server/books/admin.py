
# Register your models here.
from django.contrib import admin
from .models import Book, Favorites, Comment, WishList, RequestBook

# Register your models here.
admin.site.register(Book)
admin.site.register(Favorites)
admin.site.register(Comment)
admin.site.register(WishList)
admin.site.register(RequestBook)