from django.db import models
from django.utils import timezone
import datetime
# django model is used to create DB tables
# set all files with all required data (desc, auto create, type, etc)

class User(models.Model):
	key = models.CharField("Key", max_length=256)
	name = models.CharField("Name", max_length=100)
	user_url = models.CharField("URL", max_length=256, null=True, blank=True)
	joined = models.DateField("Registration Date", auto_now_add=True)
	bio = models.CharField("Bio", max_length=4096, null=True, blank=True)
	score = models.IntegerField(default=0, null=True, blank=True)
	following = models.ManyToManyField("self", blank=True)
	followers = models.ManyToManyField("self", blank=True)

	def __str__(self):
		return self.name


class Room(models.Model):
	key = models.CharField("Key", max_length=256)
	name = models.CharField("Name", max_length=256)
	room_url = models.CharField("URL", max_length=256, null=True, blank=True)
	author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="room_author")
	description = models.CharField("Description", max_length=1024, blank=True)
	created = models.DateField("Registration Date", auto_now_add=True)
	score = models.IntegerField(default=0, null=True, blank=True)
	followers = models.ManyToManyField(User, related_name="room_followers", blank=True)

	def __str__(self):
		return self.name


class Tag(models.Model):
	key = models.CharField("Key", max_length=256)
	name = models.CharField("Name", max_length=256)
	tag_url = models.CharField("URL", max_length=512)


class Convo(models.Model):
	key = models.CharField("Key", max_length=256)
	title = models.CharField("Title", max_length=240)
	author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="convo_author")
	created = models.DateField("Registration Date", auto_now_add=True)
	image = models.CharField("Image", max_length=256, blank=True)
	content = models.CharField("Content", max_length=2048, blank=True)
	mainroom = models.ForeignKey(Room, related_name="main_room", blank=True, null=True, on_delete=models.CASCADE)
	rooms = models.ManyToManyField(Room, blank=True)
	followers = models.ManyToManyField(User, related_name="convo_followers", blank=True)
	upvoters = models.ManyToManyField(User, related_name="upvoters", blank=True)
	downvoters = models.ManyToManyField(User, related_name="downvoters", blank=True)
	score = models.IntegerField(default=0, null=True, blank=True)
	upvotes = models.IntegerField(default=0, null=True, blank=True)
	downvotes = models.IntegerField(default=0, null=True, blank=True)
	
	def published_recently(self):
		# if created is greater than yesterday
		return self.created >= (timezone.now() - datetime.timedelta(days=1))

	def __str__(self):
		return self.title


class Post(models.Model):
	key = models.CharField("Key", max_length=256)
	author = models.ForeignKey(User, on_delete=models.CASCADE)
	title = models.CharField("Title", max_length=240, null=True, blank=True)
	created = models.DateField("Registration Date", auto_now_add=True)
	content = models.CharField("content", max_length=2048, blank=True)
	upvotes = models.IntegerField(default=0, null=True, blank=True)
	downvotes = models.IntegerField(default=0, null=True, blank=True)
	score = models.IntegerField(default=0, null=True, blank=True)
	convo = models.ForeignKey(Convo, on_delete=models.CASCADE, null=True)

	def __str__(self):
		return self.title



