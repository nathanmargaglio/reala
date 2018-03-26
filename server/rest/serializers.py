from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest.models import Lead, Property, Contact


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class LeadSerializer(serializers.ModelSerializer):
    address = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Lead
        fields = '__all__'

    def create(self, validated_data):
        lead = Lead()
        if 'address' in validated_data:
            return lead.create_lead(validated_data['address'])
        else:
            raise serializers.ValidationError("address field required:  supply a raw address")


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'
