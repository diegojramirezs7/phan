from django.urls import path
from . import views

urlpatterns = [
    path('convos/', views.convos, name="convos"),
    path('convos/<convo_key>', views.convo_details, name="convo_details"),
    path('rooms', views.rooms, name="rooms")
]

