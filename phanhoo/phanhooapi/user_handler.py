from .serializers import *
import hashlib
from .models import Room, User, Convo

def get_user_rels(user, current_user):
	try:
		user_id = current_user.id
		rels_dic = {
			'saved': (user.followers.filter(id=user_id).count() != 0),
			'suggested': False,
		}
		return rels_dic
	except Exception as e:
		print(str(e))
		return None



def get_main_users(current_user):
	try:
		users = User.objects.all()
		results = []
		for item in users:
			relevantRels = get_user_rels(item, current_user)
			d = {
				'key': item.key,
				'name': item.name,
				'url': item.user_url,
				'followers': item.followers.all().count(),
				'bio': item.bio,
				'score': item.score,
				'relevantRels': relevantRels
			}
			results.append(d)

		return results
	except  Exception as e:
		print(str(e))
		return None


def save_user_followed(user, current_user):
	try:
		relevantRels = get_user_rels(user, current_user)
		if relevantRels:
			if relevantRels.get('saved'):
				user.followers.remove(current_user)
			else:
				user.followers.add(current_user)

			user.save()

		return user
	except Exception as e:
		print(str(e))
		return None


def user_updated_response(user, current_user):
	try:
		relevantRels = get_user_rels(user, current_user)
		d = {
			'key': user.key,
			'name': user.name,
			'url': user.user_url,
			'followers': user.followers.all().count(),
			'bio': user.bio,
			'score': user.score,
			'relevantRels': relevantRels
		}
		return d
	except Exception as e:
		print(str(e))
		return None



def suggest_users():
	try:
		pass
	except Exception as e:
		print(str(e))
		return None


def get_followers(current_user):
	try:
		followers = User.objects.filter(followers__id = current_user.id)
		results = []
		for item in followers:
			d = {
				'key': item.key,
				'name': item.name,
				'url': item.user_url,
				'followers': item.followers.all().count(),
				'bio': item.bio,
				'score': item.score,
				'relevantRels': {'follower': True, 'suggested': False}
			}
			results.append(d)

		return results
	except Exception as e:
		print(str(e))
		return None


def get_following(current_user):
	try:
		following = User.objects.filter(following__id = current_user.id)
		for item in following:
			d = {
				'key': item.key,
				'name': item.name,
				'url': item.user_url,
				'followers': item.followers.all().count(),
				'bio': item.bio,
				'score': item.score,
				'relevantRels': {'following': True, 'suggested': False}
			}
			results.append(d)

		return results
	except Exception as e:
		print(str(e))
		return None





