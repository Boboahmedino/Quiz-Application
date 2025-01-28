from django.db import models
import random
# Create your models here.

DIFF_CHOICES = (
    ('Easy', 'Easy'),
    ('Medium', 'Medium'),
    ('Hard', 'Hard'),
)

class Quiz(models.Model):
    name = models.CharField(max_length=200)
    topic = models.CharField(max_length=200)
    number_of_questions = models.IntegerField()
    time = models.IntegerField(help_text="duration of the quiz in minutes")
    pass_mark = models.IntegerField(help_text="required score in %")
    difficulty = models.CharField(max_length=6, choices=DIFF_CHOICES)

    class Meta:
        verbose_name_plural = 'Quizes'

    def __str__(self):
        return f"{self.name} {self.topic}"
    

    def get_questions(self):
        # this random function is to pick random questions to the users display
        questions = list(self.question_set.all())
        random.shuffle(questions)
        return questions[:self.number_of_questions]
        # return self.question_set.all()[:self.number_of_questions]