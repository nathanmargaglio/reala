from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest.models import Owner
from pprint import pprint

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

class OwnerSerializer(serializers.ModelSerializer):
    address = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Owner
        fields = '__all__'

    def create(self, validated_data):
        owner = Owner()
        if 'address' in validated_data:
            owner.from_raw_address(validated_data['address'])
            owner.save()
            return owner
        else:
            raise serializers.ValidationError("address field required:  supply a raw address")
