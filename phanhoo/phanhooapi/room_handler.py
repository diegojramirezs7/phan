from .serializers import RoomSerializer
import hashlib
from .models import Room, User, Convo
from .convo_handler import get_convo_rels, get_main_convo_posts

def get_room_rels(room, current_user):
	try:

		user_id = current_user.id
		rels_dic = {
			'saved': (room.followers.filter(id=user_id).count() != 0),
			'suggested': False,
			'created': (room.author.id == current_user.id)
		}

		return rels_dic
	except Exception as e:
		# log
		print(str(e))
		return None


def main_room_list(current_user):
	try:
		#convo = Convo.objects.filter(author=current_user)
		rooms = Room.objects.all()
		results = []
		for item in rooms:
			relevantRels = get_room_rels(item, current_user)
			d = {
				'key': item.key,
				'title': item.name,
				'description': item.description,
				'followers': item.followers.all().count(),
				'convos': item.room_convos.all().count(),
				'relevantRels': relevantRels,
				'url': item.room_url
			}
			results.append(d)

		return results

	except Exception as e:
		print(str(e))
		return str(e)


def save_room_model(room_dic, user_key):
	# key, name, room_url, author, description, created, score, 
	# rank, followers, tags
	try:
		current_user = User.objects.filter(key=user_key)
		preprocessed_name = room_dic.get('title').strip().lower()
		url_string = '/rooms/'+preprocessed_name.replace(" ", "-")
		hash_input = room_dic.get('title') + str(current_user[0].id) + room_dic.get('content')

		if user_key:
			current_user = current_user[0]
			room_dic = {
				'key': hashlib.sha256(hash_input.encode()).hexdigest(),
				'name': preprocessed_name,
				'room_url': url_string,
				'author': current_user.id,
				'description': room_dic.get('content'),
				'score': 0,
				'rank': 0
			}

			serializer = RoomSerializer(data = room_dic)
			if serializer.is_valid():
				serializer.save()

				room = Room.objects.get(key = serializer.data['key'])

				room_dic = {
					'room': room,
					'user': current_user
				}

				return room_dic

		return None
	except Exception as e:
		print(str(e))
		return None


def room_created_response(room_dic):
	try:
		room = room_dic.get('room')
		user = room_dic.get('user')

		relevantRels = get_room_rels(room, user)
		if relevantRels:
			response_dic = {
				'key': room.key,
				'title': room.name,
				'description': room.description,
				'url': room.room_url,
				'followers': room.followers.all().count(),
				'convos': room.room_convos.all().count(),
				'relevantRels': relevantRels
			}

		return response_dic

	except Exception as e:
		print(str(e))
		return None

def save_room_followed(room, current_user):
	try:
		relevantRels = get_room_rels(room, current_user)
		if relevantRels:
			if relevantRels.get('saved'):
				room.followers.remove(current_user)
			else:
				room.followers.add(current_user)

			room.save()

		return room
	except Exception as e:
		print(str(e))
		return None
		

def room_updated_response(updated_room, current_user):
	try:
		relevantRels = get_room_rels(updated_room, current_user)
		if relevantRels:
			response_dic = {
				'key': updated_room.key,
				'title': updated_room.name,
				'description': updated_room.description,
				'url': updated_room.room_url,
				'followers': updated_room.followers.all().count(),
				'convos': updated_room.room_convos.all().count(),
				'relevantRels': relevantRels
			}
			return response_dic

	except Exception as e:
		print(str(e))
		return None


def get_room_convos(room, current_user):
	try:
		convos = Convo.objects.filter(mainroom = room)
		results = []
		for item in convos:
			relevantRels = get_convo_rels(item, current_user)
			convo_posts = get_main_convo_posts(item, current_user)
			d = {
				'key': item.key,
				'relevantRels': {},
				'convoStarter': {
					'author': {'name': item.author.name, 'url': item.author.user_url, 'key': item.author.key},
					'title': item.title,
					'room': {'name': item.mainroom.name, 'url': item.mainroom.room_url, 'key': item.mainroom.key},
					'content': item.content,
					'hasImage': not item.image == '',
					'image': item.image
				},
				'relatedPosts': convo_posts,
				'convoFooter': {
					'score': item.score,
					'upvotes': item.upvoters.all().count(),
					'downvotes': item.downvoters.all().count(),
				}
			}
			results.append(d)

		return results
	except Exception as e:
		print(str(e))
		return None


def get_room(name, key=""):
	try:
		pass
	except Exception as e:
		print(str(e))
		return None


def delete_room(room_dic):
	pass

