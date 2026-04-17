from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *

class HomeView(APIView):
    def get(self, request):
        data = {
            "hero": HeroSerializer(Hero.objects.first() or Hero()).data,
            "about": AboutSerializer(About.objects.first() or About()).data,
            "contact": ContactSerializer(Contact.objects.first() or Contact()).data,
            "menu_categories": MenuCategorySerializer(MenuCategory.objects.prefetch_related('dishes').all(), many=True).data,
        }
        return Response(data)