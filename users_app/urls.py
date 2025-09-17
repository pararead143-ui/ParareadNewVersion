from django.urls import path
from .views import RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('signup/', RegisterView.as_view(), name='signup'),  # Only signup endpoint
    path('login/', TokenObtainPairView.as_view(), name='login'),  # JWT login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # JWT refresh
]
