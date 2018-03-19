# Generated by Django 2.0.2 on 2018-03-19 16:09

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rest', '0012_owner_users'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='owner',
            name='email',
        ),
        migrations.RemoveField(
            model_name='owner',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='owner',
            name='home',
        ),
        migrations.RemoveField(
            model_name='owner',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='owner',
            name='phone',
        ),
        migrations.RemoveField(
            model_name='owner',
            name='raw_name',
        ),
        migrations.AddField(
            model_name='owner',
            name='estated',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=None),
        ),
    ]