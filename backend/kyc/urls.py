from django.urls import path
from .views import KYCSubmitView, KYCQueueView, kyc_detail_view

app_name = 'kyc'

urlpatterns = [
    path('submit/', KYCSubmitView.as_view(), name='kyc-submit'),
    path('queue/', KYCQueueView.as_view(), name='kyc-queue'),
    path('<int:pk>/', kyc_detail_view, name='kyc-detail'),
]
