from .serializers import *
import hashlib
from .models import Room, User, Convo

def get_main_users(current_users):
	try:
		users = User.objects.all()
		results = []
		for item in users:
			# relevantRels = get_room_rels(item, current_user)
			d = {
				'key': item.key,
				'name': item.name,
				'url': item.user_url,
				'followers': item.followers.all().count(),
				'bio': item.bio,
				'score': item.score
			}
			results.append(d)

		return results
	except  Exception as e:
		print(str(e))
		return None