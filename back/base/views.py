from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view,permission_classes
from django.contrib.auth import logout
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from base.serializers import BookingSerializer,PhotoSerializer,UserSerializer
from .models import CalendarDate,Booking,Photos
import calendar
import datetime
import ast

@csrf_exempt



@api_view(['POST'])
#register method
def register(request):
    # print(request.data)
    serializer = UserSerializer(data =request.data)
    if serializer.is_valid():
        User.objects.create_user(email=request.data['email'], password=request.data['password'],username=request.data['username'],first_name=request.data["First_Name"],last_name=request.data["Last_Name"])
        password=request.data['password']
        username=request.data['username']
        return JsonResponse({"password":password,"username":username})
    else:
        # print(serializer.errors)
        return JsonResponse({"error":serializer.errors['username']})
        


@api_view(['POST'])
#logout user
def logout_user(request):
    logout(request)
    return JsonResponse({'user':"logout"})


#set user token
"""This method create for each user token to be recognize 

    Returns: Token
"""
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        print(user.is_superuser)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['admin']=user.is_superuser
        return token

#  signin/Login
"""This method uses MyTokenObtainPairSerializer to check if the user is valid"""
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


"""This is the heart of the system, for each chosen  date this method check if the chosen date is already in the DB.
    if it is exsits return the remain work hours for the specific date.
        but before its run on the list to return only the future hours.
    else it checks which week day is is to match the correct work hours
        and returns the work hours as list

"""
#set hours for each date
@api_view(['POST'])
def date(request):
    date=request.data['date']
    date_time_obj = datetime.datetime.strptime(date, '%d.%m.%Y')
    if not CalendarDate.objects.filter(date=date_time_obj).exists():
        if calendar.day_name[datetime.date.weekday(date_time_obj)] == 'Friday':
            w_hours=["08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00"]
                
            CalendarDate.objects.create(date=date_time_obj,work_hours=w_hours)
            return JsonResponse({"hours":w_hours})
        else:
            w_hours=["08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00"]
                
            CalendarDate.objects.create(date=date_time_obj,work_hours=w_hours)
            return JsonResponse({"hours":w_hours})
    else:
        w_hours=CalendarDate.objects.get(date=date_time_obj).work_hours 
        # print(w_hours[0])
        # print(type(w_hours))
        new_hour_list=ast.literal_eval(w_hours)
        # print(type(new_hour_list))
        now=datetime.datetime.now().time()
        # print(now)
        sort_hour_list=[]
        for i in range(len(new_hour_list)):
            time=datetime.datetime.strptime(new_hour_list[i],'%H:%M').time()
            if time < now:
                pass
            else:
                sort_hour_list.append(str(datetime.time.strftime(time,'%H:%M')))
        # print(date_time_obj.date())
        # print(datetime.datetime.today().date())
        current_date=datetime.datetime.today().date()
        if date_time_obj.date() >current_date:
            return JsonResponse({"hours":w_hours})
            
        else:
            print(datetime.datetime.today().date())
            return JsonResponse({"hours":str(sort_hour_list)})
            


       
"""
This method set all the booking data by check all the currents dates and sort them.
Its match each book hour to the spcific date and after that for each user.
"""    
@api_view(['GET'])   
def getCalendar(request):
    booking_data=Booking.objects.filter()
    # print(len(booking_data))
    # print(booking_data[0])
    dates_list=[]
    for i in range(len(booking_data)):
        # res=datetime.datetime.strptime(str(booking_data[i]), '%d.%m.%Y').date()
        # print(res)
        # print(str(res))
        # print(str(booking_data[i]))
        dates_list.append(str(booking_data[i]))
    # print(list(set(sort_dates)))
    sort_dates=list(set(dates_list))
    booking_for_date={}
    for date in sort_dates:
        booking=Booking.objects.filter(book_date = date) 
        serializer =BookingSerializer(booking,many=True)
        # print(serializer.data[0]['book_date'])
        # print(len(serializer.data))
        for i in range (len(serializer.data)):
            # print(serializer.data[i]['book_hour'])
            # print(serializer.data[i]['user'])
            date=serializer.data[0]['book_date']
            book_hour=serializer.data[i]['book_hour']
            first_name=User.objects.filter(id=serializer.data[i]['user'])[0].first_name
            last_name=User.objects.filter(id=serializer.data[i]['user'])[0].last_name
            username=f"{first_name} {last_name}"
            # print(username)
            if date in booking_for_date:
                booking_for_date[date].append({"book_hour":book_hour,"username":username})
            else: 
                booking_for_date[date]=[{"book_hour":book_hour,"username":username}]
                
    # print(booking_for_date)
            
    return JsonResponse({"booking":booking_for_date})

    

""" POST method:
This method is create to match chosen book hour to the user that pick it.

GET method:
returns all the bookig data for the specific user

""" 
@api_view(['POST','GET'])
#add booking data
@permission_classes([IsAuthenticated])
def booking (request):
    if request.method == 'POST':
        
        # print(request.data)
        
        data=request.data
        
        date_time_obj = datetime.datetime.strptime(data['book_date'], '%d.%m.%Y')

        w_hours=CalendarDate.objects.get(date=date_time_obj)
        
        res=ast.literal_eval(w_hours.work_hours)
        
        data['index_of_hour_in_work_hours']=res.index(data['book_hour'])
        
        # print(data)
        
        serializer = BookingSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
 
            w_hours=CalendarDate.objects.get(date=date_time_obj)
            
            res=ast.literal_eval(w_hours.work_hours)
            # print(res)
            res.pop(res.index(data['book_hour']))
            # print(res)
            w_hours.work_hours=str(res)
            
            w_hours.save()
        
            return Response("data saved")
        else:
            
            return Response(serializer.errors)
        
    if request.method == 'GET':
        # print(request.user.id)
        booking_data=Booking.objects.filter(user =request.user.id)    
           
        serializer =BookingSerializer(booking_data,many=True)
        # print(serializer.data)
        return Response(serializer.data)
        


"""
In this method by getting the Booking id delete it from the DB anf return the time to the specific date.
"""     
@api_view(['POST'])
#delete data from booking DB
@permission_classes([IsAuthenticated])
def cancle_book(request):
        # print(request.data)
        if request.method == 'POST':
            books = Booking.objects.get(id =request.data["id"])
            # print(request.data["id"])
            serializer =BookingSerializer(books)
            # print(serializer.data)
            books.delete()
            date_time_obj = datetime.datetime.strptime(serializer.data['book_date'], '%d.%m.%Y')
            # print(date_time_obj)
            w_hours=CalendarDate.objects.get(date=date_time_obj)
            # print(w_hours)
            res=ast.literal_eval(w_hours.work_hours)
            res.insert(serializer.data['index_of_hour_in_work_hours'],(serializer.data['book_hour']))
            w_hours.work_hours=str(res)
            w_hours.save()
            # print(res)
            
            return Response(serializer.data)
        


@api_view(['GET'])
#deploy photos
def getImages(request):
    if request.method == 'GET':
        res=[] #create an empty list
        for img in Photos.objects.all(): #run on every row in the table...
            res.append({
                "id":img.id,
                "title":img.title,
                "content":img.content,
                "image":str( img.image)
                }) #append row by to row to res list
        # print(res)
        return JsonResponse(res,safe=False)
        
class APIViews(APIView):
    #upload photo
    parser_class = (MultiPartParser, FormParser)
    def post(self, request, *args, **kwargs):
        print(request.data)
        photo_serializer = PhotoSerializer(data=request.data)
        if photo_serializer.is_valid():  # the serializer check our data
            photo_serializer.save()  # save to DB (path,str) and save the actual file to directory
            return Response(photo_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', photo_serializer.errors)
            return Response(photo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       

@api_view(['DELETE'])
#delete photo
def delPhoto(request,urlId):
    photo = Photos.objects.get(id =urlId).delete()
    print(photo)
    print(urlId)
    
    return JsonResponse("res",safe=False)
    
    
@api_view(['GET'])
def test(request):
    
     return JsonResponse([{"time":"08:00"},{"time":"09:00"},{"time":"18:00"}],safe=False )