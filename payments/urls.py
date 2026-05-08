from django.urls import path

from .views import FakePaymentView

urlpatterns = [
    path('<int:booking_id>/pay/', FakePaymentView.as_view()),
]
