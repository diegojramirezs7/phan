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
		mainroom = [x for x in Room.objects.filter(name=convoDic.get('mainroom').strip().lower())]
		
		tags = save_tags(convoDic.get('tags'))

		if current_user and mainroom:
			hash_input = convoDic.get('title') + str(current_user[0].id) + convoDic.get('content')
			mainroom = mainroom[0]
			current_user = current_user[0]
			model_dic = {
				'key': hashlib.sha256(hash_input.encode()).hexdigest(),
				'title': convoDic.get('title'),
				'author': current_user.id,
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

				serializer_dic = {
					'serializer': serializer,
					'user': current_user,
					'mainroom': mainroom
				}

				return serializer_dic
		else:
			#log
			return None
	except Exception as e:
		#log
		print(str(e))
		return None


def prepare_client_response(serializer_dic):
	modelSer = serializer_dic.get('serializer')
	user = serializer_dic.get('user')
	mainroom = serializer_dic.get('mainroom')

	if modelSer.is_valid():				
		response_dic = {
			'key': modelSer.data['key'],
			'relevantRels': {'created': True},
			'convoStarter': {
				'author': {'name': user.name, 'url': user.user_url, 'key': user.key},
				'title': modelSer.data['title'],
				'room': {'name': mainroom.name, 'url': mainroom.room_url, 'key': mainroom.key},
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


def convo_list(request):
	#x = {'name': item.mainroom.name, 'url': item.mainroom.room_url, 'key': item.mainroom.key},
	if request.method == 'GET':
		try:
			user_key = request.headers.get('User-Key')
			current_user = User.objects.get(key=user_key)
			#convo = Convo.objects.filter(author=current_user)
			convos = Convo.objects.all()
			results = []
			for item in convos:
				d = {
					'key': hashlib.sha256(item.key.encode()).hexdigest(),
					'relevantRels': {'created': True},
					'convoStarter': {
						'author': {'name': item.author.name, 'url': item.author.user_url, 'key': item.author.key},
						'title': item.title,
						'room': {'name': item.mainroom.name, 'url': item.mainroom.room_url, 'key': item.mainroom.key},
						'content': item.content,
						'hasImage': not item.image == '',
						'image': item.image
					},
					'relatedPosts': {},
					'convoFooter': {
						'score': item.score,
						'upvotes': item.upvotes,
						'downvotes': item.downvotes,
					}
				}
				results.append(d)
		except Exception as e:
			print(str(e))
			return str(e)
	elif request.method == 'POST':
		results = []

	return results


"""
I don't think this needs much explaining, it's just so obvious. 
Protests reached most countries in the world. 
Some real changes will occur after this. This is a divisive issue, but it really shouldn't be. 
I think we can all agree that GF's death was terrible and unfair. 
However, other suggestions like reparations and such are not really the solution.
"""





