from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest.models import Owner

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

class OwnerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Owner
        fields = ('first_name', 'last_name', 'phone', 'email',
                  'street_number', 'route', 'locality', 'county',
                  'state', 'postal_code', 'lat', 'lon')