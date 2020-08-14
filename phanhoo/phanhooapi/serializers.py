from rest_framework import serializers
from .models import *

class ConvoSerializer(serializers.ModelSerializer):

	class Meta:
		# defines metadata that our model has and that must be converted to Convo class
		model = Convo
		
		# when __all__ is used, all fields have to specified on instantiation
		# the only fields that can be left out are many to many fields and the ones that have default
		fields = '__all__'
		# exclude = ['users', 'otherField']


class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User

		fields = '__all__'



class RoomSerializer(serializers.ModelSerializer):

	class Meta:
		model = Room

		fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
	convos = ConvoSerializer(many=True, read_only=True)

	class Meta:
		model = Tag

		fields = '__all__'


class PostSerializer(serializers.ModelSerializer):

	class Meta:
		model = Post

		fields = '__all__'

