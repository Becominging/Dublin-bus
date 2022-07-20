# Generated by Django 4.0.5 on 2022-06-30 11:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Calendar',
            fields=[
                ('service_id', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('monday', models.BooleanField()),
                ('tuesday', models.BooleanField()),
                ('wednesday', models.BooleanField()),
                ('thursday', models.BooleanField()),
                ('friday', models.BooleanField()),
                ('saturday', models.BooleanField()),
                ('sunday', models.BooleanField()),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Route',
            fields=[
                ('route_id', models.CharField(max_length=120, primary_key=True, serialize=False)),
                ('agency_id', models.CharField(max_length=120)),
                ('route_short_name', models.CharField(max_length=120)),
                ('route_long_name', models.CharField(max_length=200)),
                ('route_type', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Shape',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('shape_id', models.CharField(max_length=120)),
                ('shape_pt_lat', models.FloatField()),
                ('shape_pt_lon', models.FloatField()),
                ('shape_pt_sequence', models.IntegerField()),
                ('shape_dist_traveled', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Stop',
            fields=[
                ('stop_id', models.CharField(max_length=120, primary_key=True, serialize=False)),
                ('stop_name', models.CharField(max_length=120)),
                ('stop_num', models.IntegerField()),
                ('stop_lat', models.FloatField()),
                ('stop_lon', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Trip',
            fields=[
                ('trip_id', models.CharField(max_length=120, primary_key=True, serialize=False)),
                ('shape_id', models.CharField(max_length=120)),
                ('trip_headsign', models.CharField(max_length=120)),
                ('direction_id', models.IntegerField()),
                ('calendar', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dbus.calendar')),
                ('route', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dbus.route')),
            ],
        ),
        migrations.CreateModel(
            name='StopTime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('arrival_time', models.TimeField()),
                ('departure_time', models.TimeField()),
                ('stop_sequence', models.IntegerField()),
                ('stop_headsign', models.CharField(max_length=120)),
                ('pickup_type', models.IntegerField()),
                ('drop_off_type', models.IntegerField()),
                ('shape_dist_traveled', models.FloatField()),
                ('stop', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dbus.stop')),
                ('trip', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dbus.trip')),
            ],
        ),
        migrations.CreateModel(
            name='Line',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('line', models.CharField(max_length=10)),
                ('stop', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dbus.stop')),
            ],
        ),
    ]
