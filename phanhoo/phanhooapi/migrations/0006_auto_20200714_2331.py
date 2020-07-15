# Generated by Django 3.0.8 on 2020-07-15 06:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('phanhooapi', '0005_convo_mainroom'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='room_url',
            field=models.CharField(blank=True, max_length=256, null=True, verbose_name='URL'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_url',
            field=models.CharField(blank=True, max_length=256, null=True, verbose_name='URL'),
        ),
    ]
