from django.contrib import admin
from .models import MerchantKYC

@admin.register(MerchantKYC)
class MerchantKYCAdmin(admin.ModelAdmin):
    list_display = [
        'merchant_name', 'business_name', 'business_type', 
        'status', 'expected_volume', 'created_at'
    ]
    list_filter = ['status', 'business_type', 'created_at']
    search_fields = ['merchant_name', 'business_name']
    readonly_fields = ['created_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Business Information', {
            'fields': ('merchant_name', 'business_name', 'business_type', 'expected_volume')
        }),
        ('KYC Documents', {
            'fields': ('pan_card', 'aadhaar_card', 'bank_statement')
        }),
        ('Status & Timeline', {
            'fields': ('status', 'created_at')
        }),
    )
