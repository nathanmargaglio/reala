from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest.serializers import UserSerializer, GroupSerializer, \
    LeadSerializer, LeadLimitedSerializer
from rest.models import Lead
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
    queryset = Lead.objects.all()
    serializer_class = LeadLimitedSerializer

    """
    def get_serializer_class(self):
        query_params = self.request.GET
        if 'all' in query_params and query_params['all'] in ['true', 'True', 'TRUE']:
            return LeadSerializer
        return LeadLimitedSerializer
    """

    def get_queryset(self):
        query_params = self.request.GET
        if 'single' in query_params and query_params['single'] in ['true', 'True', 'TRUE']:
            return Lead().get_single_result(query_params)
        return Lead().get_by_components(query_params)

    def retrieve(self, request, pk=None):
        if request.user.is_anonymous:
            #return Response("You have to be logged in to view this resource", 401)
            pass

        queryset = Lead.objects.all()
        lead = get_object_or_404(queryset, pk=pk)

        if self.request.user in lead.users.all():
            serializer = LeadSerializer(lead)
            return Response(serializer.data)

        query_params = self.request.GET
        if 'purchase' in query_params and query_params['purchase'] in ['true', 'True', 'TRUE']:
            lead.generate_owner()
            lead.users.add(request.user)
            serializer = LeadSerializer(lead)
            return Response(serializer.data)

        serializer = LeadLimitedSerializer(lead)
        return Response(serializer.data)
