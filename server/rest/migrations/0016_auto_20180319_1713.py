# Generated by Django 2.0.2 on 2018-03-19 17:13

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rest', '0015_auto_20180319_1712'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lead',
            name='estated',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=None, null=True),
        ),
    ]