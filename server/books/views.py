import random
from rest_framework import viewsets, serializers, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from user.models import User
from .models import Book, Favorites, Comment, WishList
from .serializers import BookSerializer, FavoriteSerializer, CommentSerializer, WishListSerializer, \
    FavoriteByUserSerializer, WishListByUserSerializer, BookRequestSerializer
import pickle


class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'isbn']

    def list(self, request, *args, **kwargs):
        queryset = super().get_queryset()
        title_query = self.request.query_params.get('title', None)
        isbn = self.request.query_params.get('isbn', None)
        if title_query:
            queryset = queryset.filter(title__icontains=title_query)[:7]
        elif isbn:
            queryset = queryset.filter(isbn=isbn)
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        return Response({'data': {"result": data}})


class TopRatedBookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer

    def list(self, request, *args, **kwargs):
        queryset = Book.objects.all()
        random_books = list(queryset)
        random.shuffle(random_books)
        num_books_to_return = min(len(random_books), 10)
        random_books = random_books[:num_books_to_return]
        serializer = self.get_serializer(random_books, many=True)
        data = serializer.data
        return Response({'data': {"result": data}})


new_data = pickle.load(open('models/movies_list.pkl', 'rb'))
similarity = pickle.load(open('models/similarity.pkl', 'rb'))


def recommend(title, num_recommendations=30):
    index = new_data[new_data['Title'] == title].index[0]
    distance = sorted(enumerate(similarity[index]), reverse=True, key=lambda vector: vector[1])
    recommendations = []
    for i in distance[1:num_recommendations + 1]:
        book_info = new_data.iloc[i[0]]
        recommendations.append({
            'title': book_info.Title,
            'description': book_info.Description,
            'author': book_info.Author,
            'publication': book_info.Publication,
            'isbn': str(book_info.ISBN),
            'pages': book_info.Pages,
            'image': book_info.Image
        })
    return recommendations


class GetRecommendations(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    pagination_class = PageNumberPagination

    def list(self, request, *args, **kwargs):
        title_query = self.request.query_params.get('title', None)
        recommended_books = recommend(title_query, num_recommendations=30)

        page = self.paginate_queryset(recommended_books)
        if page is not None:
            paginator = self.paginator
            response_data = {
                'count': len(recommended_books),
                'next': paginator.get_next_link(),
                'previous': paginator.get_previous_link(),
                'current_page': paginator.page.number,
                'results': page
            }
            return Response(response_data)

        return Response(recommended_books)


class FavoriteViewSet(viewsets.ModelViewSet):
    queryset = Favorites.objects.all()
    serializer_class = FavoriteSerializer
    pagination_class = None

    def perform_create(self, serializer):
        clerk_id = serializer.validated_data.get('user')
        try:
            user = User.objects.get(clerk_id=clerk_id)
            serializer.save(user=user.clerk_id)
        except User.DoesNotExist:
            # Handle case where user does not exist
            raise serializers.ValidationError("User not found for clerk_id: {}".format(clerk_id))

    def get_queryset(self):
        clerk_id = self.request.query_params.get('id')
        return Favorites.objects.filter(user=clerk_id)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


class FavoriteByUserViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteByUserSerializer
    pagination_class = None

    def get_queryset(self):
        clerk_id = self.request.query_params.get('clerk_id')
        try:
            user = User.objects.get(clerk_id=clerk_id)
            return Favorites.objects.filter(user=user.clerk_id)
        except User.DoesNotExist:
            return Favorites.objects.none()

    @action(detail=False, methods=['delete'])
    def delete_favorite(self, request):
        user_id = request.data.get('user_id')
        favorite_id = request.data.get('favorite_id')

        try:
            favorite = Favorites.objects.get(user=user_id, id=favorite_id)
            favorite.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Favorites.DoesNotExist:
            return Response({"detail": "Favorite not found for the provided user and book."},
                            status=status.HTTP_404_NOT_FOUND)


class WishListViewSet(viewsets.ModelViewSet):
    queryset = WishList.objects.all()
    serializer_class = WishListSerializer
    pagination_class = None

    def get_queryset(self):
        clerk_id = self.request.query_params.get('clerk_id')
        try:
            user = User.objects.get(clerk_id=clerk_id)
            return WishList.objects.filter(user_id=clerk_id)
        except User.DoesNotExist:
            return WishList.objects.none()

    def perform_create(self, serializer):
        clerk_id = serializer.validated_data.get('user_id')
        try:
            user = User.objects.get(clerk_id=clerk_id)
            serializer.save(user_id=user.clerk_id)
        except User.DoesNotExist:
            # Handle case where user does not exist
            raise serializers.ValidationError("User not found for clerk_id: {}".format(clerk_id))

    @action(detail=False, methods=['delete'])
    def delete_wish(self, request):
        user_id = request.data.get('user_id')
        wishList_id = request.data.get('wishList_id')
        try:
            wishListIten = WishList.objects.get(user_id=user_id, id=wishList_id)
            wishListIten.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Favorites.DoesNotExist:
            return Response({"detail": "WishList not found for the provided user and book."},
                            status=status.HTTP_404_NOT_FOUND)


class WishListByUserViewSet(viewsets.ModelViewSet):
    serializer_class = WishListByUserSerializer
    pagination_class = None

    def get_queryset(self):
        clerk_id = self.request.query_params.get('clerk_id')
        try:
            user = User.objects.get(clerk_id=clerk_id)
            return WishList.objects.filter(user_id=user.clerk_id)
        except User.DoesNotExist:
            return Favorites.objects.none()


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    pagination_class = None
    queryset = Comment.objects.all()

    def perform_create(self, serializer):
        clerk_id = serializer.validated_data.get('user_id')
        try:
            user = User.objects.get(clerk_id=clerk_id)
            serializer.save(user_id=user.username)
        except User.DoesNotExist:
            # Handle case where user does not exist
            raise serializers.ValidationError("User not found for clerk_id: {}".format(clerk_id))


class CommentByBookViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    pagination_class = None

    def get_queryset(self):
        book_id = self.request.query_params.get('book_id')
        return Comment.objects.filter(book=book_id)


class RequestBook(viewsets.ModelViewSet):
    serializer_class = BookRequestSerializer
    pagination_class = None
