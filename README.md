# **Appointment management system.**
This is a  Web Application to manage and schedule appointments between providers and customers.
It has many features such as  appointments booking , appointments cancelation, providers individual working plans
In admin side you can upload images, and orginize calendar.

## Demo
The live demo of this app is deployed and can be found [here] (https://mybarbershop13.netlify.app)

You can use the following credentials with live demo:

| Account type | Username | Password 
| --- | --- | --- |
| `admin` | lior | 8109814 |
| `retail customer` | 0501111111 |1234 |

## Account types 

`admin` -  is created at database initialization. Admin can get an orginize calendar, Admin can see list of all appointments.and upload or delete images. 

`customer retail` - registration page is public and can be created by everyone. Customer can only book new appointments and manage them. This type of customer sees only services which targets retail customer.

## Booking process

To book a new appointment customer needs to be logged to the system and then:

1. Choose desired date from available dates  
2. Choose desired available hour from selected  date work hours
3. Click book on confirmation page

Available hours are calculatated with "date" view from back/base/views:


This function works as follow:

1. gets working hours from working plan for selected day 
2. if the date is not exsits in the DB :return the remain work hours for the specific date
3. but before its run on the list to return only the future hours
4. if the date is not exsits it checks which week day is is to match the correct work hour and returns the work hours as list
7. returns available hours

To cancle appointment customer needs to be logged to the system and then by click on "My books" in navbar :

Booked hours are display with "booking" view from back/base/views:

This function works as follow:

1. Get all the appointments that booked by the user by "user ID"
2. Delete it from DB
3. Return the cancled hour to his correct index in hour list
4. Return confirmation.


