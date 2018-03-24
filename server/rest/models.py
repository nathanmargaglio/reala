from django.db import models
import os
import requests
from django.conf import settings
from pprint import pprint
from django.contrib.auth.models import User, Group
from django.contrib.postgres.fields import JSONField


class Lead(models.Model):

    """
    This model provides columns and methods for individual real estate properties.

    """

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    users = models.ManyToManyField(User, blank=True)
    properties = models.ManyToManyField('Property', blank=True)
    contacts = models.ManyToManyField('Contact', blank=True)

    # Address Data
    formatted_address = models.CharField(default='', unique=True, max_length=128)
    street_number = models.IntegerField(default=None, null=True)
    route = models.CharField(default='', max_length=128)
    city = models.CharField(default='', max_length=128)
    county = models.CharField(default='', max_length=128)
    state = models.CharField(default='', max_length=128)
    postal_code = models.CharField(default='', max_length=128)
    lat = models.FloatField(default=None, null=True)
    lng = models.FloatField(default=None, null=True)
    place_id = models.CharField(default='', max_length=128)
    place_type = models.CharField(default='', max_length=128)


    @staticmethod
    def get_by_components(data):
        """
        Query Parcels by address components, ignoring case
        :param data: a dictionary of key-value address components
        :return: Matched queried Parcel objects

        """
        parcels = Lead.objects.all()

        for key in data:
            if key in [f.name for f in Lead._meta.get_fields()]:
                parcels = parcels.filter(**{key+'__icontains': data[key]})

        return parcels

    @staticmethod
    def get_single_result(data):
        """
        Attempts to return a single Parcel from components
        :param data:  a dictionary of key-value address components
        :return:  Matched queried Parcel object if one is found, None if 0 or more than one are found

        """

        components = {}
        for field in [f.name for f in Lead._meta.get_fields()]:
            if field in data:
                components[field] = data[field]
                parcels = Lead.get_by_components(components)

                if len(parcels) == 1:
                    return parcels

        return None

    @staticmethod
    def get_geocode_address(formatted_address):
        """
        Convert a 'pretty' address into it's components via Google API
        :param formatted_address: a string, the address formatted from components (e.g., '123 Fake St, Buffalo, NY')
        :return: a dictionary representing the JSON response from the Google Geocode API

        """

        url_address = formatted_address.replace(' ', '+')
        get_url = "https://maps.googleapis.com/maps/api/geocode/json?address={}&key=".format(url_address) \
                  + settings.GOOGLE_API_KEY

        r = requests.get(get_url)
        return r.json()

    def set_fields_from_string(self, address):
        """
        Set the model's fields from a 'raw' address
        :param address: a string, the address formatted from components (e.g., '123 Fake St, Buffalo, NY')
        :return: self, the newly attributed model

        """

        data = self.get_geocode_address(address)
        print(data)
        address_components = data['results'][0]['address_components']
        formatted_address = data['results'][0]['formatted_address']
        geometry = data['results'][0]['geometry']
        place_id = data['results'][0]['place_id']
        types = data['results'][0]['types']

        for comp in address_components:
            cv = comp['short_name']
            ct = comp['types'][0]

            if ct == 'street_number': self.street_number = int(cv)
            if ct == 'route': self.route = cv
            if ct == 'locality': self.city = cv
            if ct == 'administrative_area_level_2': self.county = cv
            if ct == 'administrative_area_level_1': self.state = cv
            if ct == 'postal_code': self.postal_code = cv

        self.formatted_address = formatted_address
        self.lat = float(geometry['location']['lat'])
        self.lng = float(geometry['location']['lng'])
        self.place_id = place_id
        self.place_type = types[0]

        return self

    def purchase_property_data(self):
        p = Property()
        p.is_premium = True
        p.set_premium_data(self.formatted_address)
        p.save()
        self.properties.add(p)
        self.save()
        p.save()
        return p


class LeadData(models.Model):
    """
    This model provides columns and methods for data that's associated with Lead entries.

    """

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_premium = models.BooleanField()
    premium_data = JSONField(default=None, null=True)
    user_data = JSONField(default=None, null=True)


class Property(LeadData):

    """
    This model provides columns and methods for Property data.

    """

    @staticmethod
    def get_premium_data(formatted_address):
        """
        Get Property info via Estated API
        :param formatted_address: a string, the address formatted from components (e.g., '123 Fake St, Buffalo, NY')
        :return: a dictionary representing the JSON response from the Estated Property API

        """

        url_address = formatted_address.replace(' ', '+')
        get_url = "https://estated.com/api/property?token={}&conjoined_address={}"\
            .format(settings.ESTATED_API_KEY, url_address)

        r = requests.get(get_url)
        return r.json()

    def set_premium_data(self, formatted_address):
        """
        Creates an Owner object and fills it with data
        :param data: a dict with Owner data
        :return: newly generated Owner object

        """

        res = self.get_premium_data(formatted_address)

        if res['status'] == 'success':
            self.premium_data = res['data']
            self.save()
            return self
        else:
            return None


class Contact(LeadData):

    """
    This model provides columns and methods for contact information.

    """

    @staticmethod
    def get_premium_data(formatted_address):
        """
        Get Property info via Estated API
        :param formatted_address: a string, the address formatted from components (e.g., '123 Fake St, Buffalo, NY')
        :return: a dictionary representing the JSON response from the Estated Property API

        """

        url_address = formatted_address.replace(' ', '+')
        get_url = "https://estated.com/api/property?token={}&conjoined_address={}"\
            .format(settings.ESTATED_API_KEY, url_address)

        r = requests.get(get_url)
        return r.json()

    def set_premium_data(self):
        """
        Creates an Owner object and fills it with data
        :param data: a dict with Owner data
        :return: newly generated Owner object

        """

        res = self.get_estated_data(self.formatted_address)

        if res['status'] == 'success':
            self.estated = res['data']
            self.save()
            return self
        else:
            return None

