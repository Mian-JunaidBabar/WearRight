from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .utils import classify_skin_tone

class FaceScannerAPIView(APIView):
    def post(self, request, *args, **kwargs):
        if 'image' not in request.FILES:
            return Response({"error": "No frame file provided"}, status=status.HTTP_400_BAD_REQUEST)
            
        uploaded_image = request.FILES['image']
        detected_tone = classify_skin_tone(uploaded_image)
        
        return Response({
            "status": "success",
            "detected_skin_tone": detected_tone,
            "confidence_score": 94.5
        }, status=status.HTTP_200_OK)

class CuratedRecommendationAPIView(APIView):
    def get(self, request):
        target_tone = request.query_params.get('tone', 'Medium')
        target_culture = request.query_params.get('style', 'Western')
        
        # Enforce exact sub-15 slice query to tackle user choice overload
        filtered_products = Product.objects.filter(
            compatible_skin_tone=target_tone,
            cultural_tag=target_culture
        )[:15]
        
        product_list = [{
            "id": p.id,
            "name": p.name,
            "category": p.category,
            "price": str(p.price)
        } for p in filtered_products]
        
        return Response({"curated_items": product_list}, status=status.HTTP_200_OK)