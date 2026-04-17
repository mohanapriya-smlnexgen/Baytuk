from rest_framework import serializers
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ['id', 'name', 'description', 'price', 'is_veg', 'image']

class MenuCategorySerializer(serializers.ModelSerializer):
    dishes = DishSerializer(many=True, read_only=True)
    class Meta:
        model = MenuCategory
        fields = ['id', 'name', 'dishes']

class HeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = ['title', 'subtitle', 'background_image']

class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = ['title', 'description', 'image']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['address', 'phone', 'email', 'map_link']

class HomeView(APIView):
    def get(self, request):
        data = {
            "hero": HeroSerializer(Hero.objects.first() or Hero()).data,
            "about": AboutSerializer(About.objects.first() or About()).data,
            "contact": ContactSerializer(Contact.objects.first() or Contact()).data,
            "menu_categories": MenuCategorySerializer(
                MenuCategory.objects.prefetch_related('dishes').all(), 
                many=True
            ).data,
        }
        return Response(data)