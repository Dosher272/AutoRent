from django.db import models

class CarCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Car(models.Model):
    category = models.ForeignKey(
        CarCategory,
        on_delete=models.CASCADE,
        related_name='cars'
    )

    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField()

    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)

    transmission = models.CharField(
        max_length=20,
        choices=[
            ('manual', 'Механика'),
            ('automatic', 'Автомат')
        ]
    )

    car_class = models.CharField(
        max_length=20,
        choices=[
            ('economy', 'Низкий'),
            ('middle', 'Средний'),
            ('luxury', 'Люкс')
        ]
    )

    status = models.CharField(
        max_length=20,
        choices=[
            ('available', 'Доступен'),
            ('booked', 'Забронирован')
        ],
        default='available'
    )

    description = models.TextField(blank=True)

    image = models.ImageField(
        upload_to='cars/',
        blank=True,
        null=True
    )

    def __str__(self):
        return f"{self.brand} {self.model}"
