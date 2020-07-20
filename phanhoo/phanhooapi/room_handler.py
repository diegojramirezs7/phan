def create_room(room_dic):
	# key, name, room_url, author, description, created, score, 
	# rank, followers, tags
	preprocessed_name = convoDic.get('mainroom').strip().lower()
	url_string = preprocessed_name.replace(" ", "-")
	room_dic = {
		'key': hashlib.sha256(preprocessed_name.encode()).hexdigest(),
		'name': preprocessed_name,
		'room_url': url_string,
		'author': author.id if author else None
		'description': "",
		'score': 0,
		'rank': 0
	}



def update_room(room_dic):
	pass


def get_room(name, key=""):
	pass


def get_room_convos(name, key=""):
	pass


def delete_room(room_dic):
	pass



