from base.models import Booking,CalendarDate,Photos,User

from rest_framework.serializers import ModelSerializer


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        

class DateSerializer(ModelSerializer):
    class Meta:
        model = CalendarDate
        fields = '__all__'

class BookingSerializer(ModelSerializer):
    class Meta:
        model = Booking        
        fields = '__all__'
        extra_kwargs = {"user_id": {"required": "user_id"},
                          "book_date": {"required": "bookDate"},
                          "book_hour": {"required": "book_hour"}}
               
class PhotoSerializer(ModelSerializer):
    class Meta:
        model = Photos
        fields = '__all__'