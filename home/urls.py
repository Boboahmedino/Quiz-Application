from django.urls import path
# from .import views

from .views import(
    QuizListView,
    quiz,
    quiz_data_view,
    save_quiz_view
)

urlpatterns = [
    path('', QuizListView.as_view(), name = 'home'),
    path('<pk>/', quiz, name = 'quiz'),
    path('<pk>/data/', quiz_data_view, name = 'quiz_data_view'),
    path('<pk>/save/', save_quiz_view, name = 'save_quiz_view'),
    
]
