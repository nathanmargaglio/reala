# Generated by Django 2.0.2 on 2018-03-24 00:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rest', '0017_auto_20180323_2333'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='leaddata',
            name='users',
        ),
    ]