from django.db import models
from django.utils import timezone

from bookings.models import Booking


class Payment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Ожидает оплаты'),
        ('succeeded', 'Оплачено'),
        ('canceled', 'Отменено'),
    ]

    booking = models.OneToOneField(
        Booking,
        on_delete=models.CASCADE,
        related_name='payment',
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
    )
    card_last4 = models.CharField(max_length=4, blank=True)
    paid_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def mark_as_paid(self, card_number):
        digits = ''.join(ch for ch in card_number if ch.isdigit())
        self.card_last4 = digits[-4:]
        self.status = 'succeeded'
        self.paid_at = timezone.now()
        self.save()

    def __str__(self):
        return f'Оплата бронирования №{self.booking_id}'
