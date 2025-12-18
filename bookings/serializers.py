from rest_framework import serializers
from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(
        source='get_status_display',
        read_only=True
    )

    car_name = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = [
            'id',
            'car',
            'car_name',
            'start_date',
            'end_date',
            'status',
            'status_display',
        ]

    def get_car_name(self, obj):
        return f"{obj.car.brand} {obj.car.model}"
