from django.db import models

class Owner(models.Model):
    first_name = models.CharField()
    last_name = models.CharField()
    phone = models.CharField()
    email = models.CharField()

    street_number = models.IntegerField()
    route = models.CharField()
    locality = models.CharField()
    county = models.CharField()
    state = models.CharField()
    postal_code = models.CharField()
    lat = models.Floatfield()
    lon = models.FloatField()

    def get_formatted_address(self, address):
        https: // maps.googleapis.com / maps / api / geocode / json?address = 1600 + Amphitheatre + Parkway, +Mountain + View, +CA & key = YOUR_API_KEY