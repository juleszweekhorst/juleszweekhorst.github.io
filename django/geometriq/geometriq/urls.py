from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from django.views.generic import TemplateView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include('landing.urls')),
    path('quote/', include('quote.urls')),
    path('tail/', TemplateView.as_view(template_name="base.html")),     # new
    path("__reload__/", include("django_browser_reload.urls")),

    
] + static(settings.MEDIA_URL, document_root =settings.MEDIA_ROOT)
urlpatterns += staticfiles_urlpatterns()
