from django.contrib import admin
from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (TokenRefreshView,)
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    # path('', views.index ),
    path('login', MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register',views.register ,name="register"),
    path('logout_user', views.logout_user, name='logout'),
    path('date', views.date, name='date'),
    path('test', views.test, name='test'),
    path('getCalendar', views.getCalendar, name='getCalendar'),
    path('booking', views.booking, name='booking'),
    path('cancle_book', views.cancle_book, name='cancle_book'),
    path('getImages', views.getImages, name='getImages'),
    path('posts/',views.APIViews.as_view(),name='posts_list'),
    path('delPhoto/<int:urlId>', views.delPhoto, name='delPhoto'),

]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
