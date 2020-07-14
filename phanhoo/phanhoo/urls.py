"""phanhoo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from .views import *
from phanhooapi import views
from django.conf.urls import url

# the include() functions allows to reference other URLconfs
"""
 Whenever Django encounters include(), it chops off whatever part of the URL matched up to that point 
 and sends the remaining string to the included URLconf for further processing. Otherwise, it maps urls to views.
"""

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('phanhooapi.urls')),
]




# urlpatterns = [
#     path('admin/', admin.site.urls),
#     # handle both create and listing POST & GET
#     re_path(r'^api/convos/$', views.convos),
#     # handle both delete and update DELETE & PUT
#     re_path(r'^api/convos/(P[0-9]+)$', views.convo_details),
#   # path('api/', include('phanhooapi.urls')),
#     path('test/<int:num_param>', index)
# ]