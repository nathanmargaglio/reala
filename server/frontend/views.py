from django.http import HttpResponse
from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse


def index(request):
    return render(request, 'index.html')


def keys(request):
    data = {'CLIENT_ID': settings.CLIENT_ID}
    return JsonResponse(data)
