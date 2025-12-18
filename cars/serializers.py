from rest_framework import serializers
from .models import Car


class CarSerializer(serializers.ModelSerializer):
    transmission_display = serializers.CharField(
        source='get_transmission_display',
        read_only=True
    )

    car_class_display = serializers.CharField(
        source='get_car_class_display',
        read_only=True
    )

    image = serializers.SerializerMethodField()

    class Meta:
        model = Car
        fields = [
            'id',
            'brand',
            'model',
            'year',
            'price_per_day',
            'image',
            'transmission',
            'transmission_display',
            'car_class',
            'car_class_display',
            'status',
        ]

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return None
