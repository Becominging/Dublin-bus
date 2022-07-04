from rest_framework import serializers

from .models import Stop, Shape, Trip, StopTime


class StopModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stop
        fields = '__all__'

# class ShapeModelSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = Shape
#         fields = '__all__'

# class ShapeSerializer(serializers.Serializer):
#
#     shape_id = serializers.CharField(read_only=True)
#     shape_pt_lat = serializers.FloatField()
#     shape_pt_lon = serializers.FloatField()
#     shape_pt_sequence = serializers.IntegerField()
#     shape_dist_traveled = serializers.FloatField()
#     trip = serializers.PrimaryKeyRelatedField(label='trip', queryset=Trip.objects.all())