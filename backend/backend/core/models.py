from django.db import models

class Hero(models.Model):
    title = models.CharField(max_length=200, default="BAYTUK")
    subtitle = models.CharField(max_length=300, default="Grill • Shawarma • Mandi")
    background_image = models.ImageField(upload_to='hero/')

    def __str__(self):
        return self.title

class About(models.Model):
    title = models.CharField(max_length=200, default="Our Story")
    description = models.TextField()
    image = models.ImageField(upload_to='about/', blank=True, null=True)

    def __str__(self):
        return self.title

class Contact(models.Model):
    address = models.CharField(max_length=300, default="626 Great Horton Rd, Bradford BD7 3ER")
    phone = models.CharField(max_length=50, default="01274 780810")
    email = models.EmailField(blank=True, null=True)
    map_link = models.URLField(blank=True, null=True)

    def __str__(self):
        return "Contact Info"

class MenuCategory(models.Model):
    name = models.CharField(max_length=100)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name_plural = "Menu Categories"

    def __str__(self):
        return self.name

class Dish(models.Model):
    category = models.ForeignKey(MenuCategory, on_delete=models.CASCADE, related_name='dishes', null=True, blank=True)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    price = models.CharField(max_length=50)
    is_veg = models.BooleanField(default=False)
    image = models.ImageField(upload_to='dishes/', blank=True, null=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} - {self.price}"