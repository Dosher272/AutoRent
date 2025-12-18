from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied, ValidationError
from django.shortcuts import get_object_or_404

from .models import Booking
from .serializers import BookingSerializer
class BookingCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = BookingSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        car = serializer.validated_data['car']
        start_date = serializer.validated_data['start_date']
        end_date = serializer.validated_data['end_date']

        #  Проверяем пересечение дат
        conflict = Booking.objects.filter(
            car=car,
            status__in=['pending', 'approved'],
            start_date__lte=end_date,
            end_date__gte=start_date
        ).exists()

        if conflict:
            raise ValidationError(
                'Этот автомобиль уже забронирован на выбранные даты'
            )

        booking = serializer.save(
            user=request.user,
            status='pending'
        )

        return Response(
            BookingSerializer(booking).data,
            status=status.HTTP_201_CREATED
        )
class MyBookingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        bookings = Booking.objects.filter(
            user=request.user
        ).order_by('-id')

        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)
class CancelBookingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        booking = get_object_or_404(Booking, pk=pk)

        if booking.user != request.user and request.user.role != 'admin':
            raise PermissionDenied('Нет доступа')

        booking.status = 'cancelled'
        booking.save()

        return Response({'message': 'Бронирование отменено'})
class AllBookingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != 'admin':
            raise PermissionDenied('Только для администратора')

        bookings = Booking.objects.all().order_by('-id')
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)
class ApproveBookingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        if request.user.role != 'admin':
            raise PermissionDenied('Только для администратора')

        booking = get_object_or_404(Booking, pk=pk)

        
        conflict = Booking.objects.filter(
            car=booking.car,
            status='approved',
            start_date__lte=booking.end_date,
            end_date__gte=booking.start_date
        ).exclude(id=booking.id).exists()

        if conflict:
            raise ValidationError(
                'Нельзя подтвердить: авто уже занято в эти даты'
            )

        booking.status = 'approved'
        booking.save()

        return Response({'message': 'Бронирование подтверждено'})
