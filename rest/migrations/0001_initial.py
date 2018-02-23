# Generated by Django 2.0.2 on 2018-02-23 01:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Owner',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=128)),
                ('last_name', models.CharField(max_length=128)),
                ('phone', models.CharField(max_length=128)),
                ('email', models.CharField(max_length=128)),
                ('street_number', models.IntegerField()),
                ('route', models.CharField(max_length=128)),
                ('locality', models.CharField(max_length=128)),
                ('county', models.CharField(max_length=128)),
                ('state', models.CharField(max_length=128)),
                ('postal_code', models.CharField(max_length=128)),
                ('lat', models.FloatField()),
                ('lon', models.FloatField()),
            ],
        ),
    ]
