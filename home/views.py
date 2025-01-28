from django.shortcuts import render
from django.views.generic import ListView
from .models import *
from django.http import JsonResponse
from questions.models import *
from results.models import *
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

# Create your views here.


# if i want users to start immediately from the login page
# @method_decorator(login_required(login_url='login'), name='dispatch')
class QuizListView(ListView):
    model = Quiz
    template_name = 'home/home.html'

@login_required(login_url='authentication/login')
def quiz(request, pk):
    quiz = Quiz.objects.get(pk = pk)

    context = {
        'quiz' : quiz,
    }
    return render(request, 'home/quiz.html', context)

@login_required(login_url='authentication/login')
def quiz_data_view(request, pk):
    quiz = Quiz.objects.get(pk =pk)
    questions = []
    for question in quiz.get_questions():
        answers = []
        for ans in question.get_answers():
            answers.append(ans.text)
        questions.append({str(question): answers})
    return JsonResponse({
        'data': questions,
        'time': quiz.time,
    })

@login_required(login_url='authentication/login')
def save_quiz_view(request, pk):
    # print(request.POST)
    # if request.is_ajax(): # this does not work in django 5.0 and was depreciated in 4.0
    if request.headers.get('X-Requested-With') == "XMLHttpRequest": # this is what works with django 5.0
        questions = []
        data = request.POST
        data_ = dict(data.lists())
        # print(type(data))
        # print(type(data_))
        # print(data_)
        data_.pop('csrfmiddlewaretoken')
        # print(data_)

        for k in data_.keys():
            print('Question: ', k)
            question = Question.objects.get(text = k)
            questions.append(question)
        print(questions)

        user = request.user
        quiz = Quiz.objects.get(pk = pk)

        score = 0
        multiplier = 100 / quiz.number_of_questions
        results = []
        correct_answer = None


        for q in questions:
            a_selected = request.POST.get(str(q.text))
            
            if a_selected != '':
                question_answers = Answer.objects.filter(question = q)
                for a in question_answers:
                    if a_selected == a.text:
                        if a.correct:
                            score += 1
                            correct_answer = a.text
                        else:
                            if a.correct:
                                correct_answer = a.text

                results.append({str(q): {'correct_answer' : correct_answer, 'answered' : a_selected}})
            else:
                results.append({str(q): 'not answered'})


        score_ = score * multiplier
        Results.objects.create(quiz = quiz, user =user, score = score_)
        
        if score_ >= quiz.pass_mark:
            return JsonResponse({'passed': True, 'score': score_, 'results': results})
        else:
            return JsonResponse({'passed' : False, 'score': score_, 'results': results})
