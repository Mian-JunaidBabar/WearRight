from django.urls import path
from .views import FaceScannerAPIView, CuratedRecommendationAPIView

urlpatterns = [
    path('scanner/analyze/', FaceScannerAPIView.as_view(), name='api-face-scan'),
    path('products/recommendations/', CuratedRecommendationAPIView.as_view(), name='api-curated-shop'),
]