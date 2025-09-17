from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users_app.urls')),
    path("api/users_app/", include("users_app.urls")),  # new added
    path('api/pararead_app/', include('pararead_app.urls')),

]
