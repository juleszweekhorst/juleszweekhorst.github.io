from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from datetime import datetime, date, timezone
from django.utils import timezone
from django.template.defaultfilters import slugify
from django.db.models.signals import post_save, post_delete
import uuid


class ThreeDModel(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    material =  models.CharField(max_length=255, null=True, blank=True)
    fast = models.CharField(max_length=255, null=True, blank=True)
    normal = models.CharField(max_length=255, null=True, blank=True)
    economy = models.CharField(max_length=255, null=True, blank=True)
    notes = models.CharField(max_length=255, null=True, blank=True)
    tolerance = models.CharField(max_length=255, null=True, blank=True)
    custom =  models.CharField(max_length=255, null=True, blank=True)
    model_file = models.FileField(upload_to='static/uploads/')
    uniqueId = models.CharField(null=True, blank=True, max_length=100)
    date_created = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return '{} {}'.format(self.name, self.uniqueId)

    def save(self, *args, **kwargs):
        if self.date_created is None:
            self.date_created = timezone.localtime(timezone.now())
        if self.uniqueId is None:
            self.uniqueId = str(uuid.uuid4()).split('-')[4]
        if self.material is None:
            self.material = 'steel'
        if self.fast is None:
            self.fast = 10
        if self.normal is None:
            self.normal = 8
        if self.economy is None:
            self.economy = 5

        self.last_updated = timezone.localtime(timezone.now())
        super(ThreeDModel, self).save(*args, **kwargs)

# class Quote(models.Model):
#     threeDModel = models.ForeignKey(ThreeDModel, blank=True, null=True, on_delete=models.CASCADE)
#     fast = models.CharField(max_length=255, null=True, blank=True)
#     normal = models.CharField(max_length=255, null=True, blank=True)
#     economy = models.CharField(max_length=255, null=True, blank=True)
#     notes = models.CharField(max_length=255, null=True, blank=True)
#     uniqueId = models.CharField(null=True, blank=True, max_length=100)
#     date_created = models.DateTimeField(blank=True, null=True)

#     def __str__(self):
#         return '{} {}'.format(self.uniqueId)

#     def save(self, *args, **kwargs):
#         if self.date_created is None:
#             self.date_created = timezone.localtime(timezone.now())
#         if self.uniqueId is None:
#             self.uniqueId = str(uuid.uuid4()).split('-')[4]
#         if self.fast is None:
#             self.fast = 10
#         if self.normal is None:
#             self.normal = 8
#         if self.economy is None:
#             self.economy = 5
#         self.last_updated = timezone.localtime(timezone.now())
#         super(Quote, self).save(*args, **kwargs)