from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *

class HomeView(APIView):
    def get(self, request):
        data = {
            "hero": HeroSerializer(
                Hero.objects.first() or Hero(),
                context={'request': request}
            ).data,
            "about": AboutSerializer(
                About.objects.first() or About(),
                context={'request': request}
            ).data,
            "contact": ContactSerializer(
                Contact.objects.first() or Contact()
            ).data,
            "menu_categories": MenuCategorySerializer(
                MenuCategory.objects.prefetch_related('dishes').all(),
                many=True,
                context={'request': request}
            ).data,
        }
        return Response(data)