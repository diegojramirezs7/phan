from django.contrib import admin

# Register your models here.
from .models import Convo

# add the convo model which represents a table in the DB
# now we can add entries through the admin site 
admin.site.register(Convo)