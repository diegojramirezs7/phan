from django.db import models
from django.utils import timezone
import datetime
# django model is used to create DB tables
# set all files with all required data (desc, auto create, type, etc)

class User(models.Model):
	key = models.CharField("Key", max_length=256)
	name = models.CharField("Name", max_length=100)
	joined = models.DateField("Registration Date", auto_now_add=True)
	bio = models.CharField("Bio", max_length=4096)
	score = models.IntegerField(default=0)
	following = models.ManyToManyField("self")
	followers = models.ManyToManyField("self")

	def __str__(self):
		return self.name


class Room(models.Model):
	key = models.CharField("Key", max_length=256)
	name = models.CharField("Name", max_length=256)
	author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="room_author")
	description = models.CharField("Description", max_length=1024)
	created = models.DateField("Registration Date", auto_now_add=True)
	score = models.IntegerField(default=0)
	followers = models.ManyToManyField(User, related_name="room_followers")

	def __str__(self):
		return self.name


class Post(models.Model):
	key = models.CharField("Key", max_length=256)
	author = models.ForeignKey(User, on_delete=models.CASCADE)
	title = models.CharField("Title", max_length=240)
	created = models.DateField("Registration Date", auto_now_add=True)
	upvotes = models.IntegerField(default=0)
	downvotes = models.IntegerField(default=0)
	score = models.IntegerField(default=0)

	def __str__(self):
		return self.title


class Convo(models.Model):
	key = models.CharField("Key", max_length=256)
	title = models.CharField("Title", max_length=240)
	author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="convo_author")
	created = models.DateField("Registration Date", auto_now_add=True)
	image = models.CharField("Image", max_length=200)
	content = models.CharField("Content", max_length=1024)
	rooms = models.ManyToManyField(Room)
	posts = models.ManyToManyField(Post)
	followers = models.ManyToManyField(User, related_name="convo_followers")
	score = models.IntegerField(default=0)
	upvotes = models.IntegerField(default=0)
	downvotes = models.IntegerField(default=0)

	
	def published_recently(self):
		# if created is greater than yesterday
		return self.created >= timezone.now() - datetime.timedelta(days=1)


	def __str__(self):
		return self.title










