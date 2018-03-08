#!/usr/bin/env python

import django
import os
import sys
import csv
import time
import re
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bfds.settings')
django.setup()

from rest.models import Owner, Parcel

if sys.argv[1] == 'delete-all':
    # Obviously a very bad function
    # Use with caution
    Owner.objects.all().delete()
    Parcel.objects.all().delete()
    exit()

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
        street_regex = re.compile("(\d+)\W*\d*(.+)").match(row[4])
        try:
            p.street_number = int(street_regex.group(1).strip())
            p.route = street_regex.group(2).strip()
        except AttributeError as e:
            p.street_number = None
            p.route = row[4].strip()

        p.city = row[1]
        p.county = "Erie County"
        p.state = "NY"
        #p.save()
        parcels.append(p)

        o = Owner()
        o.raw_name = row[3].strip()
        o.home = p
        #o.save()
        owners.append(o)

        tf = time.time()

        if not index % 1000:
            print("{:6d}: Current: {}s  Total: {}s".format(index, tf - t0, t0 - tt))

    Owner.objects.bulk_create(owners)
    Parcel.objects.bulk_create(parcels)
