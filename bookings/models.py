<<<<<<< HEAD
from decimal import Decimal

from django.conf import settings
from django.db import models

from cars.models import Car


class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'На рассмотрении'),
        ('approved', 'Подтверждено'),
        ('cancelled', 'Отменено'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='bookings',
        null=True,
        blank=True,
    )
    car = models.ForeignKey(
        Car,
        on_delete=models.CASCADE,
        related_name='bookings',
=======
from django.db import models
from django.conf import settings
from cars.models import Car

class Booking(models.Model):
    user = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name='bookings',
    null=True,
    blank=True
)

    car = models.ForeignKey(
        Car,
        on_delete=models.CASCADE,
        related_name='bookings'
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
    )
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(
<<<<<<< HEAD
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
    )

    def __str__(self):
        return f'{self.user} - {self.car}'

    def total_days(self):
        return (self.end_date - self.start_date).days + 1

    def total_price(self):
        return Decimal(self.total_days()) * self.car.price_per_day
=======
    max_length=20,
    choices=[
        ('pending', 'На рассмотрении'),
        ('approved', 'Подтверждено'),
        ('cancelled', 'Отменено'),
    ],
    default='pending'
)


    def __str__(self):
        return f'{self.user} - {self.car}'
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
