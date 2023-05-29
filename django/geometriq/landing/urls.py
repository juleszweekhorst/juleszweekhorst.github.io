from django.urls import path
from .views import *

urlpatterns = [
    path('', home, name='home'),
    path('how/', how, name='how'),
    path('why/', why, name='why'),
    # path('about/', about, name='about'),
    path('contact/', contact, name='contact'),
    # path('pricing/', pricing, name='pricing'),

]