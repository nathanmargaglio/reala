from django.db import models
import os


class Owner(models.Model):
    first_name = models.CharField(default=None, max_length=128)
    last_name = models.CharField(default=None, max_length=128)
    phone = models.CharField(default=None, max_length=128)
    email = models.CharField(default=None, max_length=128)

    street_number = models.IntegerField(default=None)
    route = models.CharField(default=None, max_length=128)
    locality = models.CharField(default=None, max_length=128)
    county = models.CharField(default=None, max_length=128)
    state = models.CharField(default=None, max_length=128)
    postal_code = models.CharField(default=None, max_length=128)
    lat = models.FloatField(default=None)
    lon = models.FloatField(default=None)

    def get_formatted_address(self, address):
        "https://maps.googleapis.com/maps/api/geocode/json?address=" + "ADDRESS" + "&key=" + os.environ[
            'GOOGLE_API_KEY']
