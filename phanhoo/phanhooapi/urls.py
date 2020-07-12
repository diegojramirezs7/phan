from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('convos', views.convo_details, name="convos")
]

