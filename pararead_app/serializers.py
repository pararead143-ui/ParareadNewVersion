from rest_framework import serializers
from .models import ReadingMaterial

class ReadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReadingMaterial
        fields = '__all__'
        read_only_fields = ('user', 'segments', 'simplified_segments')
