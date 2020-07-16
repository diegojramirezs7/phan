from django.urls import path
from . import views

urlpatterns = [
    path('convos/', views.convo_list, name="convos")
]

