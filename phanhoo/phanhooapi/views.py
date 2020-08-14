from django.http import HttpResponse, Http404, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import sys
# sys.path.append(".")
from .models import *
from .serializers import *
import json
import hashlib
from django.db import transaction

from .convo_handler import *
from .room_handler import * 
from .user_handler import *


@api_view(['GET'])
def user(request, user_url):
	try:
		if request.method == 'GET':
			user_key = request.headers.get('User-Key')
			current_user = User.objects.get(key=user_key)
			
			user_url = '/users/{}'.format(user_url)
			requested_user = User.objects.get(user_url = user_url)

			user_dic = updated_user_response(requested_user, current_user)

			return Response(requested_user.bio)


	except Exception as e:
		print(str(e))
		return Response(str(e))


@api_view(['GET', 'POST'])
def users(request):
	# get list of users or add new user
	try:
		if request.method == 'GET':
			user_key = request.headers.get('User-Key')
			current_user = User.objects.get(key=user_key)

			results = get_main_users(current_user)
			if results:
				return Response(results, status=status.HTTP_200_OK)

			return Response("unable to retrieve users", status=status.HTTP_404_NOT_FOUND)
		else:
			return Response("unauthorized method")
	except Exception as e:
		Response(str(e))


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def user_details(request, user_key):
	try:
		if request.method == 'GET':
			pass
		elif request.method == 'POST':
			pass
		elif request.method == 'PUT':
			current_user_key = request.headers.get('User-Key')
			current_user = User.objects.get(key=current_user_key)
			user = User.objects.get(key=user_key)

			updated_user = save_user_followed(user, current_user)
			if updated_user:
				response_dic = user_updated_response(updated_user, current_user)
				return Response(response_dic, status=status.HTTP_200_OK)

			return Response('Some other error')
	except Exception as e:
		return Response(str(e))


@api_view(['GET'])
def convo(request):
	try:
		pass
	except Exception as e:
		return str(e)


@api_view(['GET', 'POST'])
def convos(request):
	try:
		if request.method == 'GET':
			user_key = request.headers.get('User-Key')
			current_user = User.objects.get(key=user_key)
			# convos = Convo.objects.filter(author=current_user)
			# serializer = ConvoSerializer(convo, context={'request': request}, many=True)
			
			results = home_convo_list(current_user)
			return Response(results, status=status.HTTP_200_OK)
		elif request.method == 'POST':
			user_key = request.headers.get('User-Key')
			convo_received = request.data.get('convo')
			serializer = save_convo_model(convo_received, user_key)

			if serializer:
				response_dic = convo_created_response(serializer)
				return Response(response_dic, status=status.HTTP_201_CREATED)
			
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	except Exception as e:
		return Response(str(e))

	#return JsonResponse(d)


@api_view(['GET', 'PUT', 'DELETE'])
def convo_details(request, convo_key):
	try:
		user_key = request.headers.get('User-Key')
		current_user = User.objects.get(key=user_key)
		
		with transaction.atomic():
			convo = Convo.objects.select_for_update().get(key=convo_key)
			if request.method == 'PUT':
				command = request.data.get('command')
				if command == 'upvote':
					updated_convo = save_convo_upvote(convo, current_user)
					if updated_convo:
						response_dic = convo_updated_response(updated_convo, current_user)
						return Response(response_dic, status=status.HTTP_202_ACCEPTED)		

				elif command == 'downvote':
					updated_convo = save_convo_downvote(convo, current_user)
					if updated_convo:
						response_dic = convo_updated_response(updated_convo, current_user)
						return Response(response_dic, status=status.HTTP_202_ACCEPTED)

				elif command == 'save':
					updated_convo = save_convo_followed(convo, current_user)
					if updated_convo:
						response_dic = convo_updated_response(updated_convo, current_user)
						return Response(response_dic, status=status.HTTP_202_ACCEPTED)

				elif command == 'reply':
					postData = request.data.get('postData')
					created_post = save_convo_reply(convo, current_user, postData)
					if created_post:
						response_dic = post_updated_response(created_post, current_user)
						return Response(response_dic, status=status.HTTP_202_ACCEPTED)

				elif command == 'upvote_post':
					post_key = request.data.get('postKey')
					post = Post.objects.get(key=post_key)
	
					updated_post = save_post_upvote(post, current_user)
					if updated_post:
					 	response_dic = post_updated_response(updated_post, current_user)
					 	return Response(response_dic, status=status.HTTP_202_ACCEPTED)

				elif command == 'downvote_post':
					post_key = request.data.get('postKey')
					post = Post.objects.get(key=post_key)
	
					updated_post = save_post_downvote(post, current_user)
					if updated_post:
					 	response_dic = post_updated_response(updated_post, current_user)
					 	return Response(response_dic, status=status.HTTP_202_ACCEPTED)
				
				return Response("wrong command sent", status=status.HTTP_401_UNAUTHORIZED)
			elif request.method == 'GET':
				pass
				# convo_list
			elif request.method == 'DELETE':
				convo.delete()
				return Response(status=status.HTTP_204_NO_CONTENT)
			

		return Response("some error")
	except Convo.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def room(request):
	try:
		pass
	except Exception as e:
		print(str(e))
		return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
def rooms(request):
	try:
		if request.method == 'GET':
			user_key = request.headers.get('User-Key')
			current_user = User.objects.get(key=user_key)

			room_name = request.query_params.get('name')
			if room_name:
				room = [x for x in Room.objects.filter(name=room_name)]
				if room:
					room = room[0]
					room_dic = room_updated_response(room, current_user)
					return Response(room_dic, status=status.HTTP_200_OK)
				else:
					return Response(data="room doesn't exist, do you want to create it now?", status=status.HTTP_202_ACCEPTED)
			else:
				results = main_room_list(current_user)
				if results:
					return Response(results, status=status.HTTP_200_OK)

		elif request.method == 'POST':
			user_key = request.headers.get('User-Key')
			room_received = request.data.get('room')

			room_dic = save_room_model(room_received, user_key)
			if room_dic:
				response_dic = room_created_response(room_dic)
				return Response(response_dic, status=status.HTTP_201_CREATED)


			return "something else"

	except Exception as e:
		print(str(e))
		return Response(str(e))


@api_view(['GET', 'POST', 'PUT'])
def room_details(request, room_key):
	try:
		if request.method == 'GET':
			url = '/rooms/'+room_key
			room = Room.objects.get(room_url=url)
			user_key = request.headers.get('User-Key')
			current_user = User.objects.get(key=user_key)
			
			room_convos = get_room_convos(room, current_user)
			room_dic = room_updated_response(room, current_user)
			response_dic = {
				'room': room_dic,
				'convos': room_convos
			}

			return Response(response_dic, status=status.HTTP_200_OK)
		elif request.method == 'PUT':
			command = request.data.get('command')
			user_key = request.headers.get('User-Key')
			current_user = User.objects.get(key=user_key)
			
			with transaction.atomic():
				room = Room.objects.select_for_update().get(key=room_key)
				if command == 'save':
					updated_room = save_room_followed(room, current_user)
					if updated_room:
						response_dic = room_updated_response(updated_room, current_user)
						return Response(response_dic, status=status.HTTP_202_ACCEPTED)

					return Response("some error")

	except Exception as e:
		print(str(e))
		return Response("some error")
