from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

# Create your models here.
class Category(models.Model):
	name =  models.CharField(max_length=100)
	created_at =  models.DateField(default=datetime.now())

	def __str__(self):
		return self.name


class Todo(models.Model):
	category =  models.ForeignKey(Category,on_delete=models.CASCADE)
	user =  models.ForeignKey(User,on_delete=models.CASCADE)
	title =  models.CharField(max_length=100)
	descripion = models.TextField()
	created_at = models.DateTimeField(default=datetime.now())

	def __str__(self):
		return self.title


