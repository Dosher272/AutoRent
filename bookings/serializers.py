from rest_framework import serializers
<<<<<<< HEAD

=======
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(
        source='get_status_display',
<<<<<<< HEAD
        read_only=True,
    )
    car_name = serializers.SerializerMethodField()
    total_days = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()
    payment_status = serializers.SerializerMethodField()
    payment_status_display = serializers.SerializerMethodField()
=======
        read_only=True
    )

    car_name = serializers.SerializerMethodField()
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b

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
<<<<<<< HEAD
            'total_days',
            'total_price',
            'payment_status',
            'payment_status_display',
        ]

    def get_car_name(self, obj):
        return f'{obj.car.brand} {obj.car.model}'

    def get_total_days(self, obj):
        return obj.total_days()

    def get_total_price(self, obj):
        return obj.total_price()

    def get_payment_status(self, obj):
        payment = getattr(obj, 'payment', None)
        return payment.status if payment else 'not_paid'

    def get_payment_status_display(self, obj):
        payment = getattr(obj, 'payment', None)
        if not payment:
            return 'Не оплачено'
        return payment.get_status_display()
=======
        ]

    def get_car_name(self, obj):
        return f"{obj.car.brand} {obj.car.model}"
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
