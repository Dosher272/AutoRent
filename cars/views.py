from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404

from .models import Car
from .serializers import CarSerializer


class CarListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        cars = Car.objects.all()

        #  фильтр по классу авто
        car_class = request.GET.get('car_class')
        if car_class:
            cars = cars.filter(car_class=car_class)

        #  фильтр по трансмиссии
        transmission = request.GET.get('transmission')
        if transmission:
            cars = cars.filter(transmission=transmission)

        #  цена ОТ 
        min_price = request.GET.get('min_price')
        if min_price:
            cars = cars.filter(price_per_day__gte=min_price)

        
        max_price = request.GET.get('max_price')
        if max_price:
            cars = cars.filter(price_per_day__lte=max_price)

        status = request.GET.get('status')
        if status:
            cars = cars.filter(status=status)

        sort = request.GET.get('sort')
        sort_mapping = {
            'price_asc': 'price_per_day',
            'price_desc': '-price_per_day',
            'year_asc': 'year',
            'year_desc': '-year',
        }
        if sort in sort_mapping:
            cars = cars.order_by(sort_mapping[sort])

        serializer = CarSerializer(cars, many=True)
        return Response(serializer.data)


class CarDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        car = get_object_or_404(Car, pk=pk)
        serializer = CarSerializer(car)
        return Response(serializer.data)
