from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('api/token/',TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/',TokenRefreshView.as_view(), name='token_refresh'),
    path('register/',views.register,name='register'),
    path('todoadd/',views.TodoAdd,name='todo'),
    path('get_todo/',views.get_todo,name='get_todo'),
    path('remove_todo/',views.remove_todo,name='remove_todo'),
    path('update_todo/',views.update_todo,name='update_todo'),
]