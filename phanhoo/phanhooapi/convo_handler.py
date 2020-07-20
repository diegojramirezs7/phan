from .models import *
from .serializers import *
import json
import hashlib

def save_tags(tag_list):
	ls = []
	for tag in tag_list:
		tag_obj, created = Tag.objects.get_or_create(name=tag.strip().lower())
		ls.append(tag_obj)

	return ls


def save_convo_model(convoDic, user_key):
	try:
		# set mainroom, if it doesn't exist create it
		# other rooms, if they exist add them. Otherwise, create them as well. 
		current_user = [x for x in User.objects.filter(key=user_key)]
		mainroom = [x for x in Room.objects.filter(name=convoDic.get('mainroom'))]
		
		tags = save_tags(convoDic.get('tags'))

		if current_user and mainroom:
			hash_input = convoDic.get('title') + str(current_user[0].id) + convoDic.get('content')
			mainroom = mainroom[0]
			model_dic = {
				'key': hashlib.sha256(hash_input.encode()).hexdigest(),
				'title': convoDic.get('title'),
				'author': current_user[0].id,
				'content': convoDic.get('content'),
				'mainroom': mainroom.id,
				'tags': [x.id for x in tags],
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
				serializer.save()
				return serializer
		else:
			#log
			return None
	except Exception as e:
		#log
		print(str(e))
		return None


def prepare_client_response(modelSer):
	if modelSer.is_valid():				
		response_dic = {
			'key': modelSer.data['key'],
			'relevantRels': {'created': True},
			'convoStarter': {
				'author': modelSer.data['author'].name,
				'title': modelSer.data['title'],
				'room': modelSer.data['mainroom'].name,
				'content': modelSer.data['content'],
				'hasImage': not modelSer.data['image'] == '',
				'image': modelSer.data['image']
			},
			'relatedPosts': {},
			'convoFooter': {
				'score': 0,
				'upvotes': 0,
				'downvotes': 0,
			}
		}

		return response_dic