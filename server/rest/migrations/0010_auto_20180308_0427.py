# Generated by Django 2.0.2 on 2018-03-08 04:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rest', '0009_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='owner',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='parcel',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
    ]
