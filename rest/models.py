from django.db import models
import os
import requests
from django.conf import settings
from pprint import pprint


class Parcel(models.Model):
    # Parcel Info
    formatted_address = models.CharField(default='', max_length=128)
    street_number = models.IntegerField(default=None)
    route = models.CharField(default='', max_length=128)
    city = models.CharField(default='', max_length=128)
    county = models.CharField(default='', max_length=128)
    state = models.CharField(default='', max_length=128)
    postal_code = models.CharField(default='', max_length=128)
    lat = models.FloatField(default=None)
    lng = models.FloatField(default=None)
    place_id = models.CharField(default='', max_length=128)
    place_type = models.CharField(default='', max_length=128)

    @staticmethod
    def get_geocoded_address(formatted_address):
        url_address = formatted_address.replace(' ', '+')
        get_url = "https://maps.googleapis.com/maps/api/geocode/json?address={}&key=".format(url_address) \
                  + settings.GOOGLE_API_KEY

        r = requests.get(get_url)
        return r.json()

    def from_raw_address(self, address):
        data = self.get_geocoded_address(address)
        address_components = data['results'][0]['address_components']
        formatted_address = data['results'][0]['formatted_address']
        geometry = data['results'][0]['geometry']
        place_id = data['results'][0]['place_id']
        types = data['results'][0]['types']

        for comp in address_components:
            cv = comp['short_name']
            ct = comp['types'][0]

            if ct == 'street_number': self.street_number = cv
            if ct == 'route': self.route = cv
            if ct == 'locality': self.city = cv
            if ct == 'administrative_area_level_2': self.county = cv
            if ct == 'administrative_area_level_1': self.state = cv
            if ct == 'postal_code': self.postal_code = cv

        self.formatted_address = formatted_address
        self.lat = geometry['location']['lat']
        self.lng = geometry['location']['lng']
        self.place_id = place_id
        self.place_type = types[0]


class Owner(Parcel):
    # Owner Info
    first_name = models.CharField(default='', max_length=128)
    last_name = models.CharField(default='', max_length=128)
    phone = models.CharField(default='', max_length=128)
    email = models.CharField(default='', max_length=128)

