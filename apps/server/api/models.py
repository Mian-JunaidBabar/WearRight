from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    skin_tone = models.CharField(max_length=50, blank=True, null=True)
    cultural_preference = models.CharField(max_length=50, default='Western')

class Product(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    cultural_tag = models.CharField(max_length=100)
    compatible_skin_tone = models.CharField(max_length=50)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name