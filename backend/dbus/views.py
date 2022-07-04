from django.http import Http404, JsonResponse

from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action

from dbus.models import Stop, Shape, Trip, StopTime, Route
from dbus.serializers import StopModelSerializer

# from dbus.serializers import ShapeModelSerializer

"""
利用: GenericViewSet视图集实现查询单一和所有数据接口
"""
class StopViewSet(ModelViewSet):
    # 指定序列化器
    serializer_class = StopModelSerializer
    # 指定查询集
    queryset = Stop.objects.all()

# class ShapeViewSet(ModelViewSet):
#     # 指定序列化器
#     serializer_class = ShapeModelSerializer
#     # 指定查询集
#     queryset = Shape.objects.all()
#
#     # /shapes/trip_id/shape_by_trip/
#     @action(methods=['get'], detail=True)
#     def shape_by_trip(self, request, trip_id):
#         """ """
#         try:
#             # get the shape_id associated with selected trip_id
#             shape_id = Trip.objects.get(trip_id=trip_id).shape_id
#         except Trip.DoesNotExist as trip_not_exist:
#             raise Http404("Invalid Trip ID") from trip_not_exist
#
#         try:
#             shape = Shape.objects.filter(shape_id=shape_id).values().order_by('shape_pt_sequence')
#         except Shape.DoesNotExist as shape_not_exist:
#             raise Http404("Invalid Shape ID") from shape_not_exist
#
#         serializer = self.get_serializer(shape)
#         return Response(serializer.data)

def route(request, route_id):
    """Returns all of the trips for a selected route."""

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