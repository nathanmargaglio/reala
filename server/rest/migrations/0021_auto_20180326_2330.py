# Generated by Django 2.0.2 on 2018-03-26 23:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rest', '0020_auto_20180326_2254'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='leaddata',
            name='lead',
        ),
        migrations.AddField(
            model_name='contact',
            name='lead',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='contacts', to='rest.Lead'),
        ),
        migrations.AddField(
            model_name='property',
            name='lead',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='properties', to='rest.Lead'),
        ),
    ]