from django.http import HttpResponse, Http404, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import *
from .serializers import *
import json
import hashlib 

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

			convo_received = request.data.get('data').get('convo')

			d = {
				'key': hashlib.sha256(convo_received.get('userKey').encode()).hexdigest(),
				'relevantRels': {'created': True},
				'convoStarter': {
					'author': convo_received.get('author'),
					'title': convo_received.get('title'),
					'room': convo_received.get('mainroom'),
					'content': convo_received.get('content'),
					'hasImage': convo_received.get('hasImage'),
					'image': convo_received.get('image')
				},
				'relatedPosts': {},
				'convoFooter': {
					'score': 0,
					'upvotes': 0,
					'downvotes': 0,
				}
			}
			
			return Response(d)
			# serializer = ConvoSerializer(data=request.data)
			# if serializer.is_valid():
			# 	serializer.save()
			# 	return Response(status=status.HTTP_201_CREATED)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	except Convo.DoesNotExist:
		raise Http404("Question Does Not Exist")

	return JsonResponse(d)


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

	return Response(results)


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