from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/cars/', include('cars.urls')),
    path('api/users/', include('users.urls')),
    path('api/bookings/', include('bookings.urls')),
<<<<<<< HEAD
    path('api/payments/', include('payments.urls')),
]

=======
]
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )