from django.db import models
from django.core.exceptions import ValidationError
from decimal import Decimal


class MerchantKYC(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('submitted', 'Submitted'),
        ('under_review', 'Under Review'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('more_info_requested', 'More Info Requested'),
    ]
    
    merchant_name = models.CharField(max_length=255)
    business_name = models.CharField(max_length=255)
    business_type = models.CharField(max_length=100)
    expected_volume = models.DecimalField(max_digits=15, decimal_places=2)
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='draft'
    )
    pan_card = models.FileField(upload_to='documents/pan/')
    aadhaar_card = models.FileField(upload_to='documents/aadhaar/')
    bank_statement = models.FileField(upload_to='documents/bank/')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def clean(self):
        # Check if status is being changed
        if self.pk:
            old_instance = MerchantKYC.objects.get(pk=self.pk)
            old_status = old_instance.status
            new_status = self.status
            
            # Cannot go from approved to draft
            if old_status == 'approved' and new_status == 'draft':
                raise ValidationError('Cannot change status from approved to draft.')
            
            # Cannot go from rejected to approved directly
            if old_status == 'rejected' and new_status == 'approved':
                raise ValidationError('Cannot change status from rejected to approved directly. Must go through review process.')
    
    def __str__(self):
        return f"{self.merchant_name} - {self.business_name}"
