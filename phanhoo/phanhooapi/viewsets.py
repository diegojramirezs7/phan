from rest_framework import routers, serializers, viewsets, status
from rest_framework.response import Response
from .serializers import UserSerializer, ConvoSerializer, TagSerializer, RoomSerializer
from .models import User, Room, Convo, Tag
from rest_framework import filters


#viewsets define the view behaviour
class UserViewset(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer


class ConvoViewSet(viewsets.ModelViewSet):
	"""
	list all workers, create new worker
	"""
	queryset = Convo.objects.all()
    serializer_class = ConvoSerializer


class RoomViewSet(viewsets.ModelViewSet):
	"""
	list all workers, create new worker
	"""
	queryset = Convo.objects.all()
    serializer_class = RoomSerializer


class TagViewSet(viewsets.ModelViewSet):
	"""
	list all workers, create new worker
	"""
	queryset = Tag.objects.all()
    serializer_class = TagSerializer
