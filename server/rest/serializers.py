from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest.models import Owner, Parcel


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class ParcelSerializer(serializers.ModelSerializer):
    address = serializers.CharField(write_only=True, required=False)
    owner = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Parcel
        fields = '__all__'

    def create(self, validated_data):
        parcel = Parcel()
        if 'address' in validated_data:
            parcel.set_fields_from_string(validated_data['address'])
            parcel.save()
            return parcel
        else:
            raise serializers.ValidationError("address field required:  supply a raw address")


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = '__all__'
