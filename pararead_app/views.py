from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from .models import ReadingMaterial
from .serializers import ReadingSerializer

class ReadingListCreateView(generics.ListCreateAPIView):
    serializer_class = ReadingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ReadingMaterial.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
