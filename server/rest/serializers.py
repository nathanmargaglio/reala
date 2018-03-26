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
    properties = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    contacts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Lead
        fields = '__all__'
        extra_fields = ['properties', 'contacts']

    def get_field_names(self, declared_fields, info):
        expanded_fields = super(LeadSerializer, self).get_field_names(declared_fields, info)

        if getattr(self.Meta, 'extra_fields', None):
            return expanded_fields + self.Meta.extra_fields
        else:
            return expanded_fields

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
