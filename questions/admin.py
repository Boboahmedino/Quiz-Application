from django.contrib import admin
from .models import *
# Register your models here.


# Using tabular inline, it will list an array of answers the user can pick from
class AnswerInline(admin.TabularInline):
    model = Answer


# specify the inlines
class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]


admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer)
