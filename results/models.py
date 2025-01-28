from django.db import models
from home.models import Quiz
from django.contrib.auth.models import User
# Create your models here.

class Results(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete = models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.FloatField()

    class Meta:
        verbose_name_plural = 'Results'

    def __str__(self):
        return str(self.pk)
    
    