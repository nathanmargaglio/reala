from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest.serializers import UserSerializer, GroupSerializer, ParcelSerializer, OwnerSerializer
from rest.models import Owner, Parcel
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


class ParcelViewSet(viewsets.ModelViewSet):
    queryset = Parcel.objects.all()
    serializer_class = ParcelSerializer

    def get_queryset(self):
        query_params = self.request.GET
        if 'single' in query_params and query_params['single'] in ['true', 'True', 'TRUE']:
            return Parcel().get_single_result(query_params)
        return Parcel().get_by_components(query_params)


class OwnerViewSet(viewsets.ModelViewSet):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer

    def retrieve(self, request, pk=None):
        query_params = self.request.GET
        if 'purchase' in query_params and query_params['purchase'] in ['true', 'True', 'TRUE']:
            pass
        else:
            return Response("Owner data available for purchase.", 402)
        # Typical Response
        queryset = Owner.objects.all()
        owner = get_object_or_404(queryset, pk=pk)
        serializer = OwnerSerializer(owner)
        return Response(serializer.data)
