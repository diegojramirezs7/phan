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


from .convo_handler import *


@api_view(['GET', 'POST'])
def convos(request):
	try:
		if request.method == 'GET':
			user_key = request.headers.get('User-Key')
			current_user = User.objects.get(key=user_key)
			# convos = Convo.objects.filter(author=current_user)
			# serializer = ConvoSerializer(convo, context={'request': request}, many=True)
			
			results = home_convo_list(current_user)
			
			#response = Response(serializer.data)
			return Response(results, status=status.HTTP_200_OK)
		elif request.method == 'POST':
			user_key = request.headers.get('User-Key')
			convo_received = request.data.get('convo')
			serializer = save_convo_model(convo_received, user_key)

			if serializer:
				response_dic = posted_convo_response(serializer)
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
		convo = Convo.objects.get(key=convo_key)
		if request.method == 'PUT':
			command = request.data.get('command')
			if command == 'upvote':
				save_convo_upvote(convo, current_user)
			elif command == 'downvote':
				save_convo_downvote(convo, current_user)
			elif command == 'reply':
				postData = request.data.get('postData')
				save_convo_reply(convo, current_user, postData)
			elif command == 'save':
				save_convo_followed(convo, current_user)

			return Response("hello there")
		elif request.method == 'GET':
			pass
			# convo_list
		elif request.method == 'DELETE':
			convo.delete()
			return Response(status=status.HTTP_204_NO_CONTENT)
			

			return Response("some error")
	except Convo.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)


	




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