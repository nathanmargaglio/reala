from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest.serializers import UserSerializer, GroupSerializer, OwnerSerializer
from rest.models import Owner
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


class OwnerViewSet(viewsets.ModelViewSet):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer

    def get_queryset(self):
        query_params = self.request.GET
        if 'single' in query_params and query_params['single'] in ['true', 'True', 'TRUE']:
            return Owner().get_single_result(query_params)
        return Owner().get_by_components(query_params)
