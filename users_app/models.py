from django.db import models

# users_app/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Optional extra fields
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username

