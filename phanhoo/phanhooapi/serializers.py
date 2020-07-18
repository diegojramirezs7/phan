from rest_framework import serializers
from .models import *

class ConvoSerializer(serializers.ModelSerializer):

	class Meta:
		# defines metadata that our model has and that must be converted to Convo class
		model = Convo
		# fields = ('key', 'title', 'author', 'image', 'content', 
		# 	'rooms', 'posts', 'followers', 'score', 'upvotes', 'downvotes')

		fields = '__all__'
		# exclude = ['users', 'otherField']


class RoomSerializer(serializers.ModelSerializer):

	class Meta:
		model = Room

		fields = '__all__'


class TagSerializer(serializers.ModelSerializer):

	class Meta:
		model = Tag

		fields = '__all__'


class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User

		fields = '__all__'


class PostSerializer(serializers.ModelSerializer):

	class Meta:
		model = Post

		fields = '__all__'