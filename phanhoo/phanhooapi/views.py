from django.http import HttpResponse, Http404, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

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
			# convo = Convo.objects.filter(author=current_user)
			results = convo_list(request)
			# serializer = ConvoSerializer(convo, context={'request': request}, many=True)
			#response = Response(serializer.data)
			return Response(results)
		elif request.method == 'POST':
			user_key = request.headers.get('User-Key')
			convo_received = request.data.get('convo')
			serializer = save_convo_model(convo_received, user_key)

			if serializer:
				response_dic = prepare_client_response(serializer)
				return Response(response_dic, status=status.HTTP_201_CREATED)
			
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	except Exception as e:
		return Response(str(e))

	#return JsonResponse(d)




@api_view(['GET', 'PUT', 'DELETE'])
def convo_details(request, convo_key):
	try:
		print("first stage")
		if request.method == 'PUT':
			user_key = request.headers.get('User-Key')
			print(user_key)
			current_user = User.objects.get(key=user_key)
			print(current_user.name)
			# gets all objects in Convos
			convo = Convo.objects.get(key=convo_key)

			return Response(convo.content)
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