# Generated by Django 2.0.2 on 2018-03-17 21:44

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('rest', '0011_auto_20180316_2012'),
    ]

    operations = [
        migrations.AddField(
            model_name='owner',
            name='users',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]