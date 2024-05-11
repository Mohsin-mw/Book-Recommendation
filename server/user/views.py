from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from user.models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = None
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'clerk_id', 'username']
