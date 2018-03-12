# Generated by Django 2.0.2 on 2018-02-27 00:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rest', '0003_auto_20180223_0148'),
    ]

    operations = [
        migrations.CreateModel(
            name='Parcel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('formatted_address', models.CharField(default=None, max_length=128)),
                ('street_number', models.IntegerField(default=None)),
                ('route', models.CharField(default=None, max_length=128)),
                ('locality', models.CharField(default=None, max_length=128)),
                ('county', models.CharField(default=None, max_length=128)),
                ('state', models.CharField(default=None, max_length=128)),
                ('postal_code', models.CharField(default=None, max_length=128)),
                ('lat', models.FloatField(default=None)),
                ('lon', models.FloatField(default=None)),
            ],
        ),
        migrations.RemoveField(
            model_name='owner',
            name='county',
        ),
        migrations.RemoveField(
            model_name='owner',
            name='id',
        ),
        migrations.RemoveField(
            model_name='owner',
            name='lat',
        ),
        migrations.RemoveField(
            model_name='owner',
            name='locality',
        ),
        migrations.RemoveField(
            model_name='owner',
            name='lon',
        ),
        migrations.RemoveField(
            model_name='owner',
            name='postal_code',
        ),
        migrations.RemoveField(
            model_name='owner',
            name='route',
        ),
        migrations.RemoveField(
            model_name='owner',
            name='state',
        ),
        migrations.RemoveField(
            model_name='owner',
            name='street_number',
        ),
        migrations.AddField(
            model_name='owner',
            name='parcel_ptr',
            field=models.OneToOneField(auto_created=True, default=None, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='rest.Parcel'),
            preserve_default=False,
        ),
    ]