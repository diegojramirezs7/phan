from django.shortcuts import render
from django.http import HttpResponse, Http404
from .models import Convo
from django.template import loader

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

def convo_details(request, convo_id):
	try:
		convo = Convo.objects.get(pk=convo_id)
	except Convo.DoesNotExist:
		raise Http404("Question Does Not Exist")

	return render(request, 'phanhooapi/details.html', {'convo': convo})


def get_convo(request):
	try:
		print(request)
	except Exception as e:
		print(srt(e))
		return str(e)

