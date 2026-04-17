from django.contrib import admin
from .models import Hero, About, Contact, MenuCategory, Dish

@admin.register(Hero)
class HeroAdmin(admin.ModelAdmin):
    list_display = ['title', 'subtitle']

@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ['title']

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['address', 'phone']

@admin.register(MenuCategory)
class MenuCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'order']
    ordering = ['order']

@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'is_veg']
    list_filter = ['category', 'is_veg']
    search_fields = ['name', 'description']