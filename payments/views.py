from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from bookings.models import Booking
from .models import Payment


class FakePaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, booking_id):
        booking = get_object_or_404(Booking, id=booking_id)

        if booking.user != request.user:
            raise PermissionDenied('Нет доступа к этому бронированию')

        if booking.status == 'cancelled':
            raise ValidationError('Нельзя оплатить отменённое бронирование')

        card_number = request.data.get('card_number', '')
        card_holder = request.data.get('card_holder', '').strip()
        expiry = request.data.get('expiry', '').strip()
        cvv = request.data.get('cvv', '').strip()

        digits = ''.join(ch for ch in card_number if ch.isdigit())

        if len(digits) != 16:
            raise ValidationError({'card_number': 'Введите 16 цифр номера карты'})

        if len(card_holder) < 3:
            raise ValidationError({'card_holder': 'Введите имя владельца карты'})

        if len(expiry) != 5 or expiry[2] != '/':
            raise ValidationError({'expiry': 'Введите срок в формате ММ/ГГ'})

        if not cvv.isdigit() or len(cvv) != 3:
            raise ValidationError({'cvv': 'Введите 3 цифры CVV'})

        payment, _ = Payment.objects.get_or_create(
            booking=booking,
            defaults={'amount': booking.total_price()},
        )

        if payment.status == 'succeeded':
            return Response({
                'message': 'Эта услуга уже оплачена',
                'payment_status': payment.status,
            })

        payment.amount = booking.total_price()
        payment.mark_as_paid(card_number)

        booking.status = 'approved'
        booking.save()

        return Response(
            {
                'message': 'Услуга успешно оплачена',
                'booking_id': booking.id,
                'amount': payment.amount,
                'payment_status': payment.status,
                'card_last4': payment.card_last4,
            },
            status=status.HTTP_200_OK,
        )
