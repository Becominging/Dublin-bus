from django.db import models

# import os
# import django
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
# django.setup()

class Stop(models.Model):
    stop_id = models.CharField(max_length=100, primary_key=True)
    stop_number = models.IntegerField()
    stop_name = models.CharField(max_length=100)
    stop_lat = models.FloatField()
    stop_lon = models.FloatField()

    class Meta:
        db_table = "stops"


class Shape(models.Model):
    shape_id = models.CharField(max_length=100)
    shape_pt_lat = models.FloatField()
    shape_pt_lon = models.FloatField()
    shape_pt_sequence = models.IntegerField()
    shape_dist_traveled = models.FloatField()

    class Meta:
        db_table = "shapes"


class Route(models.Model):
    route_id = models.CharField(max_length=100, primary_key=True)
    route_short_name = models.CharField(max_length=100)

    class Meta:
        db_table = "routes"

class Calendar(models.Model):
    service_id = models.CharField(max_length=100, primary_key=True)
    monday = models.BooleanField()
    tuesday = models.BooleanField()
    wednesday = models.BooleanField()
    thursday = models.BooleanField()
    friday = models.BooleanField()
    saturday = models.BooleanField()
    sunday = models.BooleanField()
    start_date = models.DateField()
    end_date = models.DateField()

    class Meta:
        db_table = "calendar"


class Trip(models.Model):
    trip_id = models.CharField(max_length=100, primary_key=True)
    calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE)
    shape_id = models.CharField(max_length=100)
    trip_headsign = models.CharField(max_length=100)
    direction_id = models.IntegerField()
    route = models.ForeignKey(Route, on_delete=models.CASCADE)

    class Meta:
        db_table = "trips"


class StopTime(models.Model):
    arrival_time = models.TimeField()
    departure_time = models.TimeField()
    stop = models.ForeignKey(Stop, on_delete=models.CASCADE)
    stop_sequence = models.IntegerField()
    stop_headsign = models.CharField(max_length=100)
    pickup_type = models.IntegerField()
    drop_off_type = models.IntegerField()
    shape_dist_traveled = models.FloatField()
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)

    class Meta:
        db_table = "stop_times"


class RoutesPassed(models.Model):
    stop = models.ForeignKey(Stop, on_delete=models.CASCADE)
    routes_passed = models.CharField(max_length=100)

    class Meta:
        db_table = "routes_passed"
