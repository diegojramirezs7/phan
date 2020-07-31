from django.urls import path
from . import views

urlpatterns = [
    path('convos/', views.convos, name="convos"),
    path('convos/<convo_key>', views.convo_details, name="convo_details"),
    path('rooms/', views.rooms, name="rooms"),
    path('rooms/<room_key>', views.room_details, name="room_details"),
    path('users/', views.users, name='users')
]


