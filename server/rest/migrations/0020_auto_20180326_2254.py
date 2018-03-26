# Generated by Django 2.0.2 on 2018-03-26 22:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rest', '0019_auto_20180324_0100'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lead',
            name='contacts',
        ),
        migrations.RemoveField(
            model_name='lead',
            name='properties',
        ),
        migrations.AddField(
            model_name='leaddata',
            name='lead',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='rest.Lead'),
        ),
    ]
