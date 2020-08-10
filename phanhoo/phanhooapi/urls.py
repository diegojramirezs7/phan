from django.urls import path
from . import views

urlpatterns = [
	path('convo/<convo_url>', views.convo, name='convo'),
    path('convos/', views.convos, name="convos"),
    path('convos/<convo_key>', views.convo_details, name="convo_details"),
    path('room/<room_url>', views.room, name='room'),
    path('rooms/', views.rooms, name="rooms"),
    path('rooms/<room_key>', views.room_details, name="room_details"),
    path('user/<user_url>', views.user, name='user'),
    path('users/', views.users, name='users'),
    path('users/<user_key>', views.user_details, name='user_details')
]


