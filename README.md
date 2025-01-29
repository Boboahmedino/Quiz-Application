# Quiz App Documentation

## Overview
The Quiz App is a Django-based web application designed to facilitate quiz creation, management, and participation. Users can log in to take quizzes, view scores, and track progress.

---
## Features
- User authentication (Login, Registration, Logout).
- List of quizzes with details like difficulty, time limit, and pass mark.
- Modal-based quiz start confirmation.
- Timed quiz with question display and answer submission.
- Real-time result calculation and score display.
- Mobile-friendly UI with Bootstrap integration.

---

## Installation and Setup

### Prerequisites
Ensure the following tools and libraries are installed:
- Python 3.12+
- Django 5.1+
- pip
- A code editor (e.g., VS Code, PyCharm)
- Git (optional, for version control)

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd quiz-app
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate # For Linux/Mac
   venv\Scripts\activate   # For Windows
   ```

3. Install required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Apply database migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the development server:
   ```bash
   python manage.py runserver
   ```

6. Open your browser and navigate to:
   ```
   http://127.0.0.1:8000/
   ```

---

## File Structure
```
quiz-app/
├── manage.py
├── quiz_app/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│
├── static/
│   ├── css/
│   │   ├── bootstrap.min.css
│   │   ├── home.css
│   │   ├── font-awesome.min.css
│   ├── js/
│   │   ├── home.js
│   │   ├── quiz.js
│   ├── image/
│       ├── quiz.png
│
├── templates/
│   ├── login.html
│   ├── register.html
│   ├── base.html
│   ├── home.html
│   ├── quiz.html
│
├── authentication/
│   ├── migrations/
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── views.py
│   ├── urls.py
|
├── home/
│   ├── migrations/
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── views.py
│   ├── urls.py
|
├── questions/
│   ├── migrations/
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── views.py
│   ├── urls.py
|
├── results/
│   ├── migrations/
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── views.py
│   ├── urls.py
```

---

## Templates Description

### `base.html`
The main template containing the navigation bar, meta information, and placeholder for page content using `{% block content %}`. It includes:
- Links to static files (CSS, JS, and images).
- Navigation links for login/logout/register.

### `home.html`
A landing page displaying a list of quizzes for authenticated users. Features:
- Alert messages for login/register prompts.
- Quiz cards with details and a "Start Quiz" button.

### `quiz.html`
Displays quiz details and questions with a submission form. Includes:
- Timer display.
- Dynamically loaded quiz questions.
- Result calculation after submission.

---

## Static Files

### CSS
- `bootstrap.min.css`: Pre-styled components for responsiveness and design consistency.
- `font-awesome.min.css`: Icon library for better UI design.
- `home.css`: Custom styles for quiz cards, alerts, and modal.

### JavaScript
- `home.js`: Handles modal interactions for starting quizzes.
- `quiz.js`: Manages quiz timer, form submission, and real-time score calculation.

---

## Functionality Breakdown

### User Authentication
- **Login/Logout/Register:** Implemented using Django's built-in authentication system.
- Navigation bar updates dynamically based on user authentication status.

### Quiz Management
- Quizzes are dynamically loaded from the database.
- Details include quiz name, difficulty, number of questions, time limit, and pass mark.

### Quiz Participation
1. Users confirm their intent to start a quiz using a modal.
2. Questions are displayed one at a time with options to select answers.
3. Timer ensures users complete the quiz within the allocated time.
4. Results are calculated instantly and displayed to the user.

---

## Future Enhancements
- Add leaderboard functionality.
- Allow quiz creation by admins.
- Add categories/tags for quizzes.
- Improve mobile responsiveness.

---

## Author
Olaneye Ahmed Oladapo
