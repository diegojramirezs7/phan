from django.http import HttpResponse, Http404, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Convo
from .serializers import *
import json
import hashlib 

@api_view(['GET', 'POST'])
def convos(request):
	try:
		if request.method == 'GET':
			convo = Convo.objects.all()
			serializer = ConvoSerializer(convo, context={'request': request}, many=True)
			return Response(serializer.data)
		elif request.method == 'POST':
			print(request.data)
			return HttpResponse("nothing to see here")
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


def convo_list(request):
	convo = Convo.objects.all()
	d = {
		'key': hashlib.sha256(convo[0].key.encode()).hexdigest(),
		'relevantRels': {'created': True},
		'convoStarter': {
			'author': str(convo[0].author),
			'title': convo[0].title,
			'room': str(convo[0].rooms.all()[0]),
			'content': convo[0].content,
			'hasImage': False,
			'image': ''
		},
		'relatedPosts': {},
		'convoFooter': {
			'score': convo[0].score,
			'upvotes': convo[0].upvotes,
			'downvotes': convo[0].downvotes,
		}
	}

	return JsonResponse(d)


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