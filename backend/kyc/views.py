from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from .models import MerchantKYC
from .serializers import MerchantKYCSerializer, MerchantKYCListSerializer


class KYCSubmitView(APIView):
    """
    View for merchants to submit their KYC data
    """
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.AllowAny]  # For now, will implement proper auth later
    
    def post(self, request):
        """Create a new KYC submission"""
        serializer = MerchantKYCSerializer(data=request.data)
        if serializer.is_valid():
            kyc_instance = serializer.save()
            return Response(
                MerchantKYCSerializer(kyc_instance).data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        """Get merchant's own KYC submissions (simplified - will need proper auth)"""
        # For now, return all submissions - in production, filter by merchant
        kyc_submissions = MerchantKYC.objects.all()
        serializer = MerchantKYCListSerializer(kyc_submissions, many=True)
        return Response(serializer.data)


class KYCQueueView(APIView):
    """
    View for reviewers to see all KYC submissions
    """
    permission_classes = [permissions.AllowAny]  # For now, will implement role-based auth later
    
    def get(self, request):
        """Get all KYC submissions for reviewers"""
        # In production, add role-based check here
        kyc_submissions = MerchantKYC.objects.all().order_by('-created_at')
        serializer = MerchantKYCListSerializer(kyc_submissions, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT'])
@permission_classes([permissions.AllowAny])
def kyc_detail_view(request, pk):
    """
    Get or update a specific KYC submission
    """
    kyc = get_object_or_404(MerchantKYC, pk=pk)
    
    if request.method == 'GET':
        serializer = MerchantKYCSerializer(kyc)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = MerchantKYCSerializer(kyc, data=request.data, partial=True)
        if serializer.is_valid():
            updated_kyc = serializer.save()
            return Response(MerchantKYCSerializer(updated_kyc).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
