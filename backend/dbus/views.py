from django.http import JsonResponse
from django.shortcuts import *
from django.db.models import F
from datetime import datetime, timedelta
from rest_framework.viewsets import ModelViewSet
from dbus.models import Stop, Shape, Trip, StopTime, Route, Calendar
from dbus.serializers import StopModelSerializer
import requests



class StopViewSet(ModelViewSet):
    """
    Use GenericViewSet view set to realize single and all data interface of query Stop
    """
    # 指定序列化器
    serializer_class = StopModelSerializer
    # 指定查询集
    queryset = Stop.objects.all()



def StopInfo(request, stop_id):
    """
    Return information (routes, their arrival times and delays) of buses that will arrive at a particular stop within the next hour from GTFS-R data.
    """

    try:
        stop_details = get_object_or_404(Stop, stop_id=stop_id)
    except Stop.MultipleObjectsReturned:
        stop_details = None

    result = {
        'stop_name': stop_details.stop_name,
        'stop_lat': stop_details.stop_lat,
        'stop_lon': stop_details.stop_lon,
        'arriving_bus_info': []
    }

    # Get current time
    current_date = datetime.today()

    stop_time_details = StopTime.objects.filter(
        stop_id=stop_id,
        # Get all arrival times in the next hour. gte(大于或等于),lte(小于或等于)
        arrival_time__gte=(current_date + timedelta(hours=1)).time(),
        arrival_time__lte=(current_date + timedelta(hours=2)).time()
    )

    # Get realtime data from NTA GTFS-R API
    realtime = requests.get('https://api.nationaltransport.ie/gtfsr/v1/?format=json', headers={'Cache-Control': 'no-cache','x-api-key': '59556ce266774d9f9a6eb56445cf4082'}).json()['Entity']

    # Get the day of the week
    day = current_date.strftime("%A").lower()
    # Get service IDs for current date
    service_ids = list(Calendar.objects.filter(**{day: True}).filter(start_date__lte=current_date,end_date__gte=current_date).values_list('service_id', flat=True))

    for stop_time in stop_time_details:
        # Only get details for trips that operate on the current day
        if stop_time.trip.calendar.service_id in service_ids:
            # Get stop time updates for this trip or else return None
            trip_updates = next(filter(lambda trip: trip['Id'] == stop_time.trip.trip_id, realtime), None)
            # Get the current delay for the trip in seconds.
            delay = 0
            if trip_updates:
                stop_time_updates = trip_updates['TripUpdate'].get('StopTimeUpdate')
                if stop_time_updates:
                    # Sort updates in reverse order by stop_sequence
                    stop_time_updates = sorted(stop_time_updates, key=lambda update: update['StopSequence'], reverse=True)
                    # Only get delay if stop_sequence of latest update is lower than the stop_sequence of the requested stop
                    if stop_time_updates[0]['StopSequence'] < stop_time.stop_sequence:
                        delay = stop_time_updates[0]['Departure']['Delay']

            result['arriving_bus_info'].append({
                'route_id': stop_time.trip.route.route_id,
                'trip_id': stop_time.trip.trip_id,
                'direction': stop_time.trip.direction_id,
                'final_destination_stop_name': StopTime.objects.filter(trip_id=stop_time.trip.trip_id) .order_by('-stop_sequence')[:1].first().stop.stop_name,
                'route_name': stop_time.trip.route.route_short_name,
                'service_id': stop_time.trip.calendar.service_id,
                'scheduled_arrival_time': stop_time.arrival_time,
                'scheduled_departure_time': stop_time.departure_time,
                'stop_sequence': stop_time.stop_sequence,
                'delay_in_sec': delay
            })

    result['arriving_bus_info'] = sorted(result['arriving_bus_info'], key=lambda arrival: arrival['scheduled_arrival_time'])
    return JsonResponse(result)



# def lines(request):
#     """
#     Get all of the lines in both directions for the bus network
#     """
#
#     # Get valid service IDs (current date is greater than start_date and less than end date
#     day = datetime.today().strftime("%A").lower()
#     service_ids = list(Calendar.objects.filter(**{day: True}).filter(start_date__lte=datetime.today(), end_date__gte=datetime.today()).values_list('service_id', flat=True))
#
#     result = Trip.objects.filter(calendar_id__in=service_ids).values("route_id", "direction_id", "trip_headsign","route__route_short_name").distinct()
#
#     for i, record in enumerate(result):
#         # make list of all possible trip_ids for this route & direction
#         trid_ids = \
#             Trip.objects.filter(route_id=record['route_id'],
#                             direction_id=record['direction_id'],
#                             trip_headsign=record['trip_headsign'],
#                             route__route_short_name=record['route__route_short_name']
#                             ).values_list("trip_id", flat=True)
#
#         # append the upcoming or most recently past trip_id for this route & direction
#         trip_id = \
#             StopTime.objects.order_by("departure_time")\
#                             .filter(trip_id__in=trid_ids,
#                                     shape_dist_traveled="0.00",
#                                     departure_time__gte=datetime.now())\
#                             .values_list("trip_id",flat=True)
#
#         # if there are no more services for this trip today
#         if not trip_id:
#             # then append the most recent past trip
#             result[i]['trip_id'] = \
#                 StopTime.objects.order_by("-departure_time")\
#                                 .filter(trip_id__in=trid_ids,
#                                         shape_dist_traveled="0.00")\
#                                 .values_list("trip_id", flat=True)[0]
#         else:
#             # otherwise append the most recent future trip
#             result[i]['trip_id'] = trip_id[0]
#
#         # append stops list per route & direction
#         result[i]['stops'] = list(
#             StopTime.objects.filter(trip_id=record['trip_id']
#                                     ).values("arrival_time",
#                                              "departure_time",
#                                              "stop_sequence",
#                                              "stop_headsign",
#                                              "shape_dist_traveled",
#                                              "stop_id",
#                                              stop_name=F("stop__stop_name"),
#                                              stop_number=F("stop__stop_number"),
#                                              stop_lat=F("stop__stop_lat"),
#                                              stop_lon=F("stop__stop_lon")
#                                              )
#                                     )
#
#     return JsonResponse(list(result), safe=False)



def StopsInTrip(request, trip_id):
    """
    Return the stops in a trip in order of stop sequence.
    """

    try:
        result = StopTime.objects.filter(trip_id=trip_id).values("arrival_time","departure_time", "stop_sequence","stop_headsign","shape_dist_traveled","stop_id",stop_name=F("stop__stop_name"),stop_number=F("stop__stop_number"),stop_lat=F("stop__stop_lat"),stop_lon=F("stop__stop_lon")).order_by('stop_sequence')
    except Trip.DoesNotExist:
        raise Http404("trip_id is invalid.")

    return JsonResponse(list(result), safe=False)



def ShapeOfTrip(request, trip_id):
    """
    Return the shape of a trip in order of point sequence.
    """

    try:
        # get the shape_id associated with selected trip_id
        shape_id = Trip.objects.get(trip_id=trip_id).shape_id
    except Trip.DoesNotExist:
        raise Http404("trip_id is invalid.")

    try:
        result = Shape.objects.filter(shape_id=shape_id).values().order_by('shape_pt_sequence')
    except Shape.DoesNotExist:
        raise Http404("shape_id is invalid")

    return JsonResponse(list(result), safe=False)



def TripsInRoute(request, route_id):
    """
    Return all of the trips for a selected route.
    """

    route_details = Route.objects.get(route_id=route_id)
    trips = Trip.objects.filter(route_id=route_id)

    trips_simple = []
    for trip in trips:
        trip_output = {}
        trip_output['trip_id'] = trip.trip_id
        trip_output['stops'] = []

        stop_times = StopTime.objects.filter(trip_id=trip.trip_id)
        for stop_time in stop_times:
            trip_output['stops'].append({
                'stop_id': stop_time.stop_id,
                'arrival_time': stop_time.arrival_time,
                'departure_time': stop_time.departure_time,
                'stop_sequence': stop_time.stop_sequence
            })
        trips_simple.append(trip_output)

    response = {
        'route_id': route_id,
        'route_name': route_details.route_short_name,
        'trips': trips_simple
    }

    return JsonResponse(response)
