import uuid
from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from yookassa import Configuration, Payment as YooPayment

from bookings.models import Booking
from .models import Payment

Configuration.account_id = settings.YOOKASSA_SHOP_ID
Configuration.secret_key = settings.YOOKASSA_SECRET_KEY


class CreatePaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, booking_id):
        booking = get_object_or_404(Booking, id=booking_id)

        if booking.user != request.user and request.user.role != "admin":
            raise PermissionDenied("Нет доступа")

        amount = booking.total_price()

        payment_obj, _ = Payment.objects.get_or_create(
            booking=booking,
            defaults={"amount": amount}
        )

        if payment_obj.status == "succeeded":
            return Response({"detail": "Бронирование уже оплачено"}, status=400)

        payment_obj.amount = amount

        idempotence_key = str(uuid.uuid4())

        yoo_payment = YooPayment.create({
            "amount": {
                "value": f"{amount:.2f}",
                "currency": "RUB"
            },
            "capture": True,
            "confirmation": {
                "type": "redirect",
                "return_url": settings.YOOKASSA_RETURN_URL
            },
            "description": f"Оплата бронирования {booking.id}",
        }, idempotence_key)

        payment_obj.external_id = yoo_payment.id
        payment_obj.confirmation_url = yoo_payment.confirmation.confirmation_url
        payment_obj.status = "pending"
        payment_obj.save()

        return Response({
            "confirmation_url": payment_obj.confirmation_url
        })


class PaymentStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, booking_id):
        booking = get_object_or_404(Booking, id=booking_id)

        if booking.user != request.user and request.user.role != "admin":
            raise PermissionDenied("Нет доступа")

        payment_obj = get_object_or_404(Payment, booking=booking)

        if payment_obj.external_id:
            yoo_payment = YooPayment.find_one(payment_obj.external_id)
            payment_obj.status = yoo_payment.status

            if yoo_payment.status == "succeeded" and yoo_payment.paid:
                payment_obj.paid_at = yoo_payment.created_at

            payment_obj.save(update_fields=["status", "paid_at"])

        return Response(
            {
                "status": payment_obj.status,
                "paid_at": payment_obj.paid_at,
            }
        )
