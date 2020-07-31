from .serializers import RoomSerializer
import hashlib

def create_room(room_dic, current_user):
	# key, name, room_url, author, description, created, score, 
	# rank, followers, tags
	try:
		preprocessed_name = room_dic.get('title').strip().lower()
		url_string = preprocessed_name.replace(" ", "-")
		hash_input = room_dic.get('title') + str(current_user[0].id) + romm_dic.get('content')

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

			serializer_dic = {
				'serializer': serializer,
				'user': current_user
			}

			return serializer_dic

		return None
	except Exception as e:
		print(str(e))
		return None




def update_room(room_dic):
	pass


def get_room(name, key=""):
	pass


def get_room_convos(name, key=""):
	pass


def delete_room(room_dic):
	pass



