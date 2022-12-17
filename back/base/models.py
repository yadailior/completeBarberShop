from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class CalendarDate(models.Model):
    id=models.AutoField(primary_key=True,editable=False)
    date = models.DateField(null=False)
    work_hours=models.TextField(null=False)
    def __str__(self):
     	   return self.work_hours
    
    

class Booking(models.Model):
    id=models.AutoField(primary_key=True,editable=False)
    user =models.ForeignKey(User,on_delete=models.DO_NOTHING,null=False)
    book_date=models.TextField(null=False)
    book_hour=models.TextField(null=False)
    index_of_hour_in_work_hours=models.IntegerField(null=True)
    def __str__(self):
     	   return self.book_date
     
     
     
class Photos(models.Model):
    id=models.AutoField(primary_key=True,editable=False)
    title=models.CharField(max_length=100)
    content=models.TextField()
    image=models.ImageField(upload_to='images')

    def __str__(self):
        return self.title