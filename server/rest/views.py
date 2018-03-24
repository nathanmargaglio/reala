from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import permissions, viewsets
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from rest.serializers import UserSerializer, GroupSerializer, \
    LeadSerializer, PropertySerializer, ContactSerializer
from rest.models import Lead, Property, Contact
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
import json


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class LeadViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

    def get_queryset(self):
        query_params = self.request.GET
        if 'single' in query_params and query_params['single'] in ['true', 'True', 'TRUE']:
            return Lead().get_single_result(query_params)
        return Lead().get_by_components(query_params)

    def retrieve(self, request, pk=None):
        queryset = Lead.objects.all()
        lead = get_object_or_404(queryset, pk=pk)

        query_params = request.GET
        if 'purchase' in query_params and query_params['purchase'] in ['true', 'True', 'TRUE']:
            property = lead.purchase_property_data()
            print(property)
            serializer = PropertySerializer(property)
            return Response(serializer.data)
        else:
            "they don't own it"
            pass

        if self.request.user in lead.users.all():
            serializer = LeadSerializer(lead)
            return Response(serializer.data)

        serializer = LeadSerializer(lead)
        return Response(serializer.data)


class PropertyViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Property.objects.all()
    serializer_class = PropertySerializer


class ContactViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
