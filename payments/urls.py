from django.urls import path
from .views import CreatePaymentView

urlpatterns = [
    path("<int:booking_id>/create/", CreatePaymentView.as_view()),
]