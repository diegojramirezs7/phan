from .models import *
from .serializers import *
import json
import hashlib

def save_tags(tag_lists):
	

def save_convo_model(convoDic, user_key):
	try:
		# set mainroom, if it doesn't exist create it
		# other rooms, if they exist add them. Otherwise, create them as well. 
		current_user = [x for x in User.objects.filter(key=user_key)]
		mainroom = [x for x in Room.objects.filter(name=convoDic.get('mainroom'))]
		

		if current_user and mainroom:
			hash_input = convoDic.get('title') + str(current_user[0].id) + convoDic.get('content')
			mainroom = mainroom[0]
			model_dic = {
				'key': hashlib.sha256(hash_input.encode()).hexdigest(),
				'title': convoDic.get('title'),
				'author': current_user[0].id,
				'content': convoDic.get('content'),
				'mainroom': mainroom.id,
				#'tags': convoDic.rooms,
				'image': '',
				#followers = models.ManyToManyField(User, related_name="convo_followers", blank=True)
				#upvoters = models.ManyToManyField(User, related_name="upvoters", blank=True)
				#downvoters = models.ManyToManyField(User, related_name="downvoters", blank=True)
				'score': 0,
				'upvotes': 0,
				'downvotes': 0
			}
			serializer = ConvoSerializer(data=model_dic)
			if serializer.is_valid():
				return serializer
		else:
			#log
			return None
	except Exception as e:
		#log
		print(str(e))
		return None