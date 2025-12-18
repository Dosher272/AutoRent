from django.urls import path
from .views import (
    BookingCreateView,
    MyBookingsView,
    CancelBookingView,
    AllBookingsView,
    ApproveBookingView,
)

urlpatterns = [
    path('', BookingCreateView.as_view()),
    path('my/', MyBookingsView.as_view()),
    path('admin/', AllBookingsView.as_view()),
    path('<int:pk>/cancel/', CancelBookingView.as_view()),
    path('<int:pk>/approve/', ApproveBookingView.as_view()),  # 👈 ВАЖНО
]
