from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest.models import Lead


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
    owner = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Lead
        fields = '__all__'

    def create(self, validated_data):
        lead = Lead()
        if 'address' in validated_data:
            lead.set_fields_from_string(validated_data['address'])
            lead.save()
            return lead
        else:
            raise serializers.ValidationError("address field required:  supply a raw address")
