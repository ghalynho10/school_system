# School System

A Django + React web app for classroom assignment management. Teachers create
assignments; students complete them through auto-graded tests.

## Stack
- Backend: Django, Django REST Framework
- Frontend: React
- Database: SQLite (development)

## Features
- Teacher-created assignments
- Student test-taking interface
- Automatic grading

## Running locally
1. `pip install -r requirements.txt`
2. `python manage.py migrate`
3. `python manage.py runserver`
4. `npm install && npm start` (frontend)
