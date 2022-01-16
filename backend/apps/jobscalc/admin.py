from django.contrib import admin
from django.conf.locale.pt_BR import formats as portuguese
from django.conf.locale.en import formats as english

from apps.jobscalc.models import Job, Profile

portuguese.DATE_FORMAT = 'd/m/Y'
english.DATE_FORMAT = 'd/m/Y'


@admin.register(Job)
class JobRegister(admin.ModelAdmin):
    list_display = ['__str__', 'user', 'created_at']
    search_fields = ['name', 'user']
    # list_filter = ['user',]


@admin.register(Profile)
class ProfileRegister(admin.ModelAdmin):
    list_display = ['__str__', 'created_at']
    search_fields = ['user']
