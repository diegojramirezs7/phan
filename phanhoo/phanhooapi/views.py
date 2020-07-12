from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from .models import Convo
from django.template import loader
import json

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

def convo_details(request):
	try:
		convo = Convo.objects.all().filter(key="888")
		d = {
			'author': str(convo[0].author),
			'title': convo[0].title,
			'content': convo[0].content, 
			'score': convo[0].score,
			'upvotes': convo[0].upvotes,
			'downvotes': convo[0].downvotes
		}
	except Convo.DoesNotExist:
		raise Http404("Question Does Not Exist")

	return JsonResponse(d)

def get_convo(request):
	try:
		print(request)
	except Exception as e:
		print(srt(e))
		return str(e)

