from django.contrib.auth.models import User

from rest_framework import serializers
from .models import Profile, Job

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

    name = serializers.SerializerMethodField()
    def get_name(self, obj):
        return obj.get_name()

    value_hour = serializers.SerializerMethodField()
    def get_value_hour(self, obj):
        return obj.get_value_hour()

    status_count = serializers.SerializerMethodField()
    def get_status_count(self, obj):
        jobs = obj.jobs.all()
        done_count = 0
        job_total_hours = 0
        i = -1

        for i, job in enumerate(jobs):
            if job.get_remaining_days() <= 0:
                done_count += 1
            else:
                job_total_hours += job.daily_hours

        total = i + 1
        progress_count = total - done_count
        free_hours = obj.hours_per_day - job_total_hours

        return {
            'done': done_count,
            'progress': progress_count,
            'total': total,
            'free_hours': free_hours
        }


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

    remaining_days = serializers.SerializerMethodField()
    def get_remaining_days(self, obj):
        return obj.get_remaining_days()

    budget = serializers.SerializerMethodField()
    def get_budget(self, obj):
        return obj.get_budget()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'password']

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        Profile.objects.create(
            user=user
        )
        return user