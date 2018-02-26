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

class OwnerSerializer(serializers.ModelSerializer):
    address = serializers.CharField(write_only=True)

    class Meta:
        model = Owner
        fields = '__all__'

    def create(self, validated_data):
        owner = Owner()
        print(Owner.get_geocoded_address(validated_data['address']))
        print(validated_data)
        return False