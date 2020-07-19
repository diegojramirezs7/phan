from django.urls import path
from . import views

urlpatterns = [
    path('convos/', views.convos, name="convos"),
    path('rooms', views.rooms, name="rooms")
]

