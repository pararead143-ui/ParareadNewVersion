from django.db import models
from django.conf import settings

class ReadingMaterial(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    file = models.FileField(upload_to='readings/', null=True, blank=True)
    segments = models.JSONField(blank=True, default=list)  
    simplified_segments = models.JSONField(blank=True, default=list)

    def save(self, *args, **kwargs):
        # Break into paragraphs
        self.segments = [p.strip() for p in self.content.split("\n") if p.strip()]
        # Apply simple word substitutions
        self.simplified_segments = [self.simplify_text(p) for p in self.segments]
        super().save(*args, **kwargs)

    def simplify_text(self, text):
        replacements = {
            "comprehend": "understand",
            "assist": "help",
            "purchase": "buy",
            "difficult": "hard",
            "utilize": "use"
        }
        for word, simple in replacements.items():
            text = text.replace(word, simple)
        return text
