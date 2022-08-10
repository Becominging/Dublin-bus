import re
from datetime import datetime
from csv import reader
from dbus.models import Calendar, Stop, Route, Shape, Trip, StopTime


# Deleting data in database
Stop.objects.all().delete() # PK stop_id
Route.objects.all().delete() # PK route_id
Shape.objects.all().delete() # PK shape_id
Calendar.objects.all().delete() # PK service_id
Trip.objects.all().delete() # PK trip_id , FK route, FK calendar
StopTime.objects.all().delete() # FK trip, FK stop

print('Deleting finish')


# Populate tables with PKs first before ones with FKs
# Save raw txt files into tables
with open('gtfs/stops.txt') as stops_file:
    csv_reader = reader(stops_file)

    # skip header
    next(csv_reader, None)

    for row in csv_reader:

        try:
            stop_number = int(row[1].split(" ")[-1])
        except ValueError:
            # stop number isn't in the name
            # try parse out of ID instead
            stop_number = int(row[0].split("DB")[-1])

        stops = Stop(
            stop_id=row[0],
            stop_number=stop_number,
            stop_name=row[1],
            stop_lat=float(row[2]),
            stop_lon=float(row[3])
        )

        stops.save()

print('stops.txt has been inserted')


with open('gtfs/routes.txt') as routes_file:

    csv_reader = reader(routes_file)

    # skip header
    next(csv_reader, None)

    for row in csv_reader:

        routes = Route(
            route_id=row[0],
            route_short_name=row[2]
        )

        routes.save()

print('routes.txt has been inserted')


with open('gtfs/shapes.txt') as shapes_file:

    csv_reader = reader(shapes_file)

    # skip header
    next(csv_reader, None)

    for row in csv_reader:

        shapes = Shape(
            shape_id=row[0],
            shape_pt_lat=float(row[1]),
            shape_pt_lon=float(row[2]),
            shape_pt_sequence=int(row[3]),
            shape_dist_traveled=float(row[4])
        )

        shapes.save()

print('shapes.txt has been inserted')


with open('gtfs/calendar.txt') as calendar_file:

    csv_reader = reader(calendar_file)

    # skip header
    next(csv_reader, None)

    for row in csv_reader:

        calendar = Calendar(
            service_id = row[0],
            monday = row[1] == "1",
            tuesday = row[2] == "1",
            wednesday = row[3] == "1",
            thursday = row[4] == "1",
            friday = row[5] == "1",
            saturday = row[6] == "1",
            sunday = row[7] == "1",
            start_date=datetime.strptime(row[8], '%Y%m%d'),
            end_date=datetime.strptime(row[9], '%Y%m%d')
        )

        calendar.save()

print('calender.txt has been inserted')


with open('gtfs/trips.txt') as trips_file:

    csv_reader = reader(trips_file)

    # skip header
    next(csv_reader, None)

    for row in csv_reader:

        trips = Trip(
            trip_id=row[2],
            shape_id=row[3],
            trip_headsign=row[4],
            direction_id=int(row[5]),
            route=Route.objects.get(route_id=row[0]),
            calendar=Calendar.objects.get(service_id=row[1])
        )

        trips.save()

print('trips.txt has been inserted')

with open('gtfs/stop_times.txt') as stop_times_file:

    csv_reader = reader(stop_times_file)

    # skip header
    next(csv_reader, None)

    for row in csv_reader:
        arrival_time = row[1]
        departure_time = row[2]

        # raw Dublin Bus data contains invalid times such as 24:00:11 30:00:51 etc.
        r = re.compile("24:[0-9][0-9]:[0-9][0-9]")
        if r.match(row[1]):
            arrival_time = row[1].replace("24", "00", 1)
        if r.match(row[2]):
            departure_time = row[2].replace("24", "00", 1)

        r = re.compile("25:[0-9][0-9]:[0-9][0-9]")
        if r.match(row[1]):
            arrival_time = row[1].replace("25", "01", 1)
        if r.match(row[2]):
            departure_time = row[2].replace("25", "01", 1)

        r = re.compile("26:[0-9][0-9]:[0-9][0-9]")
        if r.match(row[1]):
            arrival_time = row[1].replace("26", "02", 1)
        if r.match(row[2]):
            departure_time = row[2].replace("26", "02", 1)

        r = re.compile("27:[0-9][0-9]:[0-9][0-9]")
        if r.match(row[1]):
            arrival_time = row[1].replace("27", "03", 1)
        if r.match(row[2]):
            departure_time = row[2].replace("27", "03", 1)

        r = re.compile("28:[0-9][0-9]:[0-9][0-9]")
        if r.match(row[1]):
            arrival_time = row[1].replace("28", "04", 1)
        if r.match(row[2]):
            departure_time = row[2].replace("28", "04", 1)

        r = re.compile("29:[0-9][0-9]:[0-9][0-9]")
        if r.match(row[1]):
            arrival_time = row[1].replace("29", "05", 1)
        if r.match(row[2]):
            departure_time = row[2].replace("29", "05", 1)

        r = re.compile("30:[0-9][0-9]:[0-9][0-9]")
        if r.match(row[1]):
            arrival_time = row[1].replace("30", "06", 1)
        if r.match(row[2]):
            departure_time = row[2].replace("30", "06", 1)

        try:
            stop_times = StopTime(
                arrival_time=arrival_time,
                departure_time=departure_time,
                stop_sequence=int(row[4]),
                stop_headsign=row[5],
                shape_dist_traveled=float(row[6]),
                trip=Trip.objects.get(trip_id=row[0]),
                stop=Stop.objects.get(stop_id=row[3])
            )

            stop_times.save()

        except Trip.DoesNotExist as trip_not_exist:
            continue

print('stop_times.txt has been inserted')
