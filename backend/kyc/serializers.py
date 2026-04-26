from rest_framework import serializers
from django.core.files.uploadedfile import UploadedFile
from django.utils import timezone
from datetime import timedelta
from .models import MerchantKYC


class MerchantKYCSerializer(serializers.ModelSerializer):
    is_at_risk = serializers.SerializerMethodField()
    
    class Meta:
        model = MerchantKYC
        fields = [
            'id', 'merchant_name', 'business_name', 'business_type', 
            'expected_volume', 'status', 'pan_card', 'aadhaar_card', 
            'bank_statement', 'created_at', 'is_at_risk'
        ]
        read_only_fields = ['id', 'created_at', 'is_at_risk']
    
    def validate_file_size(self, file: UploadedFile, max_size_mb=5):
        """Validate file size (default max 5MB)"""
        max_size_bytes = max_size_mb * 1024 * 1024
        if file.size > max_size_bytes:
            raise serializers.ValidationError(
                f'File size cannot exceed {max_size_mb}MB. Current size: {file.size / (1024*1024):.2f}MB'
            )
        return file
    
    def validate_pan_card(self, value):
        return self.validate_file_size(value)
    
    def validate_aadhaar_card(self, value):
        return self.validate_file_size(value)
    
    def validate_bank_statement(self, value):
        return self.validate_file_size(value)
    
    def get_is_at_risk(self, obj):
        """Check if submission is older than 24 hours (SLA tracking)"""
        if obj.created_at:
            time_threshold = timezone.now() - timedelta(hours=24)
            return obj.created_at < time_threshold
        return False


class MerchantKYCListSerializer(serializers.ModelSerializer):
    is_at_risk = serializers.SerializerMethodField()
    
    class Meta:
        model = MerchantKYC
        fields = [
            'id', 'merchant_name', 'business_name', 'business_type', 
            'expected_volume', 'status', 'created_at', 'is_at_risk'
        ]
    
    def get_is_at_risk(self, obj):
        """Check if submission is older than 24 hours (SLA tracking)"""
        if obj.created_at:
            time_threshold = timezone.now() - timedelta(hours=24)
            return obj.created_at < time_threshold
        return False
