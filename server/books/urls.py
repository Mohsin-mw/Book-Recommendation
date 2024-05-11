from django.urls import path
from rest_framework.routers import SimpleRouter

from books import views
from books.views import FavoriteViewSet, FavoriteByUserViewSet, RequestBook, CommentViewSet, CommentByBookViewSet, WishListViewSet, WishListByUserViewSet

router = SimpleRouter(trailing_slash=False)
router.register('books/book', views.BookView, basename='books')
router.register('books/top-rated-books', views.TopRatedBookView, basename='top-rated-books')
router.register('books/recommendations', views.GetRecommendations, basename='book-recommendations')
router.register('favorites', FavoriteViewSet),
router.register('favorites-by-user', FavoriteByUserViewSet, basename='favorites-by-user'),
router.register('comments', CommentViewSet),
router.register('comments-by-book', CommentByBookViewSet, basename='comments-by-book')
router.register('wishList', WishListViewSet),
router.register('wish-by-user', WishListByUserViewSet, basename='wish-list-by-user'),
router.register('request', RequestBook, basename="request-book")
urlpatterns = router.urls


custom_urls = [
    path('favorites-by-user/delete/', views.FavoriteByUserViewSet.as_view({'delete': 'delete_favorite'}), name='delete-favorite'),
    path('wishList/delete/', views.WishListViewSet.as_view({'delete': 'delete_wish'}), name='delete_wish'),
]

urlpatterns = router.urls + custom_urls

