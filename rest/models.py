from django.db import models
import os
import requests


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

    @staticmethod
    def get_geocoded_address(formatted_address):
        url_address = formatted_address.replace(' ', '+')
        get_url = "https://maps.googleapis.com/maps/api/geocode/json?address={}&key=".format(url_address)\
               + os.environ['GOOGLE_API_KEY']

        r = requests.get(get_url)
        return r.json()
