# Generated by Django 3.0.8 on 2020-08-07 22:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('phanhooapi', '0013_auto_20200731_0858'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='email',
            field=models.CharField(blank=True, max_length=256, null=True, verbose_name='Email'),
        ),
    ]
