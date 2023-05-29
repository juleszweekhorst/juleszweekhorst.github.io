from django.urls import path
from .views import *

urlpatterns = [
    path('', upload_model, name='quote'),
    path('models/', model_list, name='model_list'),
    path('3js/', threejs_view, name='threejs_view'),
    # path('about/', about, name='about'),
    # path('contact/', contact, name='contact'),
    # path('pricing/', pricing, name='pricing'),
]