from rest_framework import serializers
from .models import *

class DishSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Dish
        fields = ['id', 'name', 'description', 'price', 'is_veg', 'image']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class MenuCategorySerializer(serializers.ModelSerializer):
    dishes = DishSerializer(many=True, read_only=True)

    class Meta:
        model = MenuCategory
        fields = ['id', 'name', 'dishes']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['dishes'] = DishSerializer(
            instance.dishes.all(),
            many=True,
            context=self.context
        ).data
        return data


class HeroSerializer(serializers.ModelSerializer):
    background_image = serializers.SerializerMethodField()

    class Meta:
        model = Hero
        fields = ['title', 'subtitle', 'background_image']

    def get_background_image(self, obj):
        request = self.context.get('request')
        if obj.background_image:
            if request:
                return request.build_absolute_uri(obj.background_image.url)
            return obj.background_image.url
        return None


class AboutSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = About
        fields = ['title', 'description', 'image']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['address', 'phone', 'email', 'map_link']