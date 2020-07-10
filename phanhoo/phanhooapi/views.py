from django.shortcuts import render
from django.http import HttpResponse
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