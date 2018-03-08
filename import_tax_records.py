#!/usr/bin/env python

import django
import os
import sys
import csv
import time
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bfds.settings')
django.setup()

from rest.models import Owner, Parcel

with open(sys.argv[1], 'r') as file:
    reader = csv.reader(file)
    headers = next(reader)
    if headers != ['', 'city', 'link', 'owner_name', 'property_location', 'sbl', 'swis']:
        error_message = "You're headers are incorrect.  Please format data to:\n"
        error_message += ', '.join(['', 'city', 'link', 'owner_name', 'property_location', 'sbl', 'swis'])
        raise Exception(error_message)

    index = 0
    tt = time.time()
    parcels = []
    owners = []

    for row in reader:
        t0 = time.time()
        index += 1

        p = Parcel()
        try:
            p.street_number = int(''.join(i for i in row[4] if i.isdigit()))
        except ValueError as e:
            p.street_number = None
        p.route = (''.join(i for i in row[4] if not i.isdigit())).strip()
        p.city = row[1]
        p.county = "Erie County"
        p.state = "NY"
        # p.save()
        parcels.append(p)

        o = Owner()
        o.raw_name = row[3].strip()
        o.home = p
        # o.save()
        owners.append(o)

        tf = time.time()

        if not index % 1000:
            print("{:6d}: Current: {}s  Total: {}s".format(index, tf - t0, t0 - tt))

Parcel.objects.bulk_create(parcels)
Owner.objects.bulk_create(owners)
