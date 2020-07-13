from django.shortcuts import render
from django.http import HttpResponse

def index(request, num_param=4):
	print(num_param)
	return HttpResponse("this is just a test {0}".format(num_param))
