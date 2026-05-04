from django.urls import path
from .views import CreatePaymentView, PaymentStatusView

urlpatterns = [
    path("<int:booking_id>/create/", CreatePaymentView.as_view()),
    path("<int:booking_id>/status/", PaymentStatusView.as_view()),
]
