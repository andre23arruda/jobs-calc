from datetime import date, timedelta
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _


class Profile(models.Model):
    '''Perfil do usuário'''
    created_at = models.DateField(auto_now=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name=_('User'))
    # avatar = models.ImageField(upload_to='uploads/user/avatar/%Y/%m/%d/', blank=True, null=True)
    avatar = models.CharField(max_length=200, blank=True, null=True)
    monthly_budget = models.PositiveIntegerField(default=2000)
    days_per_week = models.PositiveSmallIntegerField(default=1)
    hours_per_day = models.PositiveSmallIntegerField(default=10)
    vacation_per_year = models.PositiveSmallIntegerField(default=4)

    class Meta:
        verbose_name = _('Profile')
        verbose_name_plural = _('Profiles')

    def __str__(self):
        return f'{ self.user }'

    def get_name(self):
        return f'{ self.user.first_name }'

    def get_value_hour(self):
        weeks_per_year = 52
        weeks_per_month = (weeks_per_year - self.vacation_per_year ) / 12
        week_total_hours  = self.hours_per_day * self.days_per_week
        monthly_total_hours = week_total_hours * weeks_per_month
        value_hour = self.monthly_budget / monthly_total_hours
        return value_hour

class Job(models.Model):
    '''Job Model'''
    created_at = models.DateField(auto_now=True)
    user = models.ForeignKey(Profile, related_name='jobs', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    daily_hours = models.PositiveSmallIntegerField(default=1)
    total_hours = models.PositiveSmallIntegerField(default=1)

    class Meta:
        verbose_name = _('Job')
        verbose_name_plural = _('Jobs')

    def __str__(self):
        return f'{ self.name }'

    def get_remaining_days(self):
        total_days = int(self.total_hours / self.daily_hours)
        ellapsed_days = date.today() - self.created_at
        remaining_days = total_days - ellapsed_days.days
        response = 0 if remaining_days < 0 else remaining_days
        return response

    def get_budget(self):
        return int(self.total_hours * self.user.get_value_hour())
