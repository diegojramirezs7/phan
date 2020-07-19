from django.http import HttpResponse, Http404, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import *
from .serializers import *
import json
import hashlib
import random

def save_convo_model(convoDic, user_key):
	try:
		# set mainroom, if it doesn't exist create it
		# other rooms, if they exist add them. Otherwise, create them as well. 
		current_user = [x for x in User.objects.filter(key=user_key)]
		mainroom = [x for x in Room.objects.filter(name=convoDic.get('mainroom'))]
		print(convoDic.get('tags'))

		if current_user and mainroom:
			hash_input = convoDic.get('title') + str(current_user[0].id) + convoDic.get('content')
			mainroom = mainroom[0].id
			model_dic = {
				'key': hashlib.sha256(hash_input.encode()).hexdigest(),
				'title': convoDic.get('title'),
				'author': current_user[0].id,
				'content': convoDic.get('content'),
				'mainroom': mainroom,
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


def prepare_client_response(modelSer):
	if modelSer.is_valid():
		modelSer.save()
				
		response_dic = {
			'key': serializer.data['key'],
			'relevantRels': {'created': True},
			'convoStarter': {
				'author': serializer.data['author'],
				'title': serializer.data['title'],
				'room': serializer.data['mainroom'],
				'content': serializer.data['content'],
				'hasImage': not serializer.data['image'] == '',
				'image': serializer.data['image']
			},
			'relatedPosts': {},
			'convoFooter': {
				'score': 0,
				'upvotes': 0,
				'downvotes': 0,
			}
		}


@api_view(['GET', 'POST'])
def convos(request):
	try:
		if request.method == 'GET':
			user_key = request.headers.get('User-Key')
			current_user = User.objects.get(key=user_key)
			convo = Convo.objects.filter(author=current_user)
			serializer = ConvoSerializer(convo, context={'request': request}, many=True)
			response = Response(serializer.data)
			return response
		elif request.method == 'POST':
			user_key = request.headers.get('User-Key')
			convo_received = request.data.get('convo')
			serializer = save_convo_model(convo_received, user_key)

			if serializer:
				#response_dic = prepare_client_response(serializer)
				print(serializer)
				
				return Response("some data", status=status.HTTP_201_CREATED)

				#serializer = ConvoSerializer(data=model_dic)
				#return Response(response_dic, status=status.HTTP_201_CREATED)
			

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	except Exception as e:
		return Response(str(e))

	#return JsonResponse(d)


@api_view(['PUT', 'DELETE'])
def convo_details(request):
	try:
		# gets all objects in Convos
		key = haslib.sha256(request.body.get('key').encode()).hexdigest()
		convo = Convo.objects.get(pk=pk)
	except Convo.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)

	if request.method == 'PUT':
		serializer = StudentSerializer(convo, data=request.data, context={'request': request})

		if serializer.is_valid():
			serializer.save()
			return Response(status=status.HTTP_204_NO_CONTENT)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	elif request.method == 'DELETE':
		convo.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST', 'GET'])
def convo_list(request):
	if request.method == 'GET':
		user_key = request.headers.get('User-Key')
		current_user = User.objects.get(key=user_key)
		convo = Convo.objects.filter(author=current_user)
		results = []
		for item in convo:
			d = {
				'key': hashlib.sha256(item.key.encode()).hexdigest(),
				'relevantRels': {'created': True},
				'convoStarter': {
					'author': str(item.author),
					'title': item.title,
					'room': str(item.mainroom),
					'content': item.content,
					'hasImage': True,
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
	elif request.method == 'POST':
		results = []

	return Response(results)


@api_view(['GET', 'POST'])
def rooms(request):
	try:
		if request.method == 'GET':
			room_name = request.query_params.get('name')
			room = [x for x in Room.objects.filter(name=room_name)]
			if room:
				room = room[0]
				response_dic = {
					'key': room.key,
					'name': room.name,
					'relationship': 'suggested',
					'visitors': 900,
					'description': room.description
				}
				return Response(response_dic, status=status.HTTP_200_OK)
			else:
				return Response(data="room doesn't exist, do you want to create it now?", status=status.HTTP_202_ACCEPTED)
		elif request.method == 'POST':
			pass
	except Exception as e:
		print(str(e))
		return Response(str(e))



"""
def index(request):
    return HttpResponse("Hello, world. You're at the main api index.")

def convos(request):
	latest_convos_list = Convo.objects.order_by('-created')[:5]
	output = ', '.join([c.title for q in latest_convos_list])
	template = loader.get_template('phanhooapi/index.html')
	context = {
		'convo_list': "latest_convos_list"
	}
	return HttpResponse(template.render(context, request))

def convos2(request):
	latest_convos_list = Convo.objects.order_by('-created')[:5]
	output = ', '.join([c.title for q in latest_convos_list])
	context = {
		'convo_list': output
	}
	return render(request, 'phanhooapi/index.html', context)

def convos_api_traditional(request):
	convos = Convos.objects.all()
	d = {
		'author': str(convo[0].author),
		'title': convo[0].title,
		'content': convo[0].content, 
		'score': convo[0].score,
		'upvotes': convo[0].upvotes,
		'downvotes': convo[0].downvotes
	}
	return JsonResonse(d)

"""