from django.shortcuts import render
from rest_framework.decorators import api_view,parser_classes,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
import uuid
import hashlib
from datetime import datetime,timezone
from django.conf import settings
import json
from .models import Todo,Category
import os,sys
from rest_framework.renderers import JSONRenderer
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.response import Response
from django.http import JsonResponse
from django.contrib.auth.models import User
import json



@api_view(['GET'])
def get_todo(request):
	try:
		todo = Todo.objects.filter(user=request.user).order_by('-created_at').values('id','title','descripion','category__name')
		return Response({"status_code":"200","info":{todo}},status=status.HTTP_200_OK)
	except Exception as e:
		print("e",str(e))
		return Response({"status_code":"400","message":str(e)},status=status.HTTP_400_BAD_REQUEST) 




@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
	try:
		if request.method == 'POST':
			data =  request.data
			user = User.objects.create_user(username=data['username'],password=data['password'],email=data['email'])
			return Response({"status_code":"200","info":"Sucessfully Registered"},status=status.HTTP_200_OK)
	except Exception as e:
		return Response({"status_code":"400","message":str(e)},status=status.HTTP_400_BAD_REQUEST) 


@api_view(['POST'])
def TodoAdd(request):
	if request.method == 'POST':
		data =  request.data
		title = data['title']
		desc =  data['desc']
		category =  data['category']
		try:
			try:
				category = Category.objects.get(name=category)
			except:
				category = Category(name=category)
				category.save()
			todo =  Todo(category=category,title=title,descripion=desc,user=request.user)
			todo.save()
			info = {
				'id':todo.id,
				'title':data['title'],
				'descripion':data['desc'],
				'category__name':data['category']
			}
			return Response({"status_code":"200","info":info},status=status.HTTP_200_OK)
		except Exception as e:
			return Response({"status_code":"400","message":str(e)},status=status.HTTP_400_BAD_REQUEST) 



@api_view(['POST'])
def remove_todo(request):
	try:
		if request.method == 'POST':
			data = request.data
			todo = Todo.objects.get(id=data['id'])
			todo.delete()
			return Response({"status_code":"200","info":"Todo Deleted"},status=status.HTTP_200_OK)
	except Exception as e:
		return Response({"status_code":"400","message":str(e)},status=status.HTTP_400_BAD_REQUEST) 

@api_view(['PUT'])
def update_todo(request):
	if request.method=='PUT':
		try:
			data =  request.data
			print("d",data)
			category =  Category.objects.get(name=data['category'])
			todo =  Todo.objects.get(id=data['id'])
			todo.title =  data['title']
			todo.descripion =  data['desc']
			todo.category = category
			todo.save()
			return Response({"status_code":"200","info":"Todo Updated"},status=status.HTTP_200_OK)
		except Exception as e:
			return Response({"status_code":"400","message":str(e)},status=status.HTTP_400_BAD_REQUEST)
