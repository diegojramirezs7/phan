# Generated by Django 3.0.8 on 2020-07-17 03:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('phanhooapi', '0007_tag'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='rank',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='convo',
            name='rooms',
            field=models.ManyToManyField(blank=True, related_name='side_rooms', to='phanhooapi.Room'),
        ),
    ]
