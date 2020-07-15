from rest_framework import serializers
from .models import Convo

class ConvoSerializer(serializers.ModelSerializer):

	class Meta:
		# defines metadata that our model has and that must be converted to Convo class
		model = Convo
		# fields = ('key', 'title', 'author', 'image', 'content', 
		# 	'rooms', 'posts', 'followers', 'score', 'upvotes', 'downvotes')

		fields = '__all__'
		# exclude = ['users', 'otherField'] 