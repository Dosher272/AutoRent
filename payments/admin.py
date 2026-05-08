from django.contrib import admin

from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'booking', 'amount', 'status', 'card_last4', 'paid_at')
    list_filter = ('status', 'paid_at')
    search_fields = ('booking__id', 'booking__user__username', 'card_last4')
