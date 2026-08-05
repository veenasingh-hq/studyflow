# 🎓 StudyFlow

A modern full-stack student productivity application built with **React**, **Tailwind CSS**, **Python**, and **FastAPI**.

StudyFlow helps students organize study tasks, manage daily goals, and improve productivity through a clean and user-friendly interface.

This project is part of my Full Stack Development journey, where I am learning to build real-world web applications using modern frontend and backend technologies.

---

# 🚀 Project Goals

* Learn Full Stack Development
* Build a real-world React application
* Build REST APIs using FastAPI
* Connect React with FastAPI
* Practice clean software architecture
* Create a portfolio-quality project

---

# ✨ Current Features

* Project structure setup
* React + Vite frontend
* FastAPI backend
* JSON-based data storage
* Create new tasks
* View all tasks
* REST API foundation

> More features will be added as the project progresses.

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* JavaScript

## Backend

* Python
* FastAPI
* Pydantic
* Uvicorn

## Storage

* JSON

---

# 📂 Project Structure

```text
studyflow/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── crud.py
│   │   ├── schemas.py
│   │   ├── storage.py
│   │   └── __init__.py
│   │
│   └── data/
│       └── tasks.json
│
├── README.md
├── project_explanation.txt
├── reflection.txt
├── CHANGELOG.md
└── requirements.txt
```

---

# 📌 Planned Features

* Create Task
* View Tasks
* Update Task
* Delete Task
* Mark Task as Completed
* Search Tasks
* Filter by Priority
* Filter by Subject
* Daily Progress Dashboard
* Statistics
* Better Validation
* Responsive UI

---

# 📡 Planned API Endpoints

| Method | Endpoint    | Description    |
| ------ | ----------- | -------------- |
| POST   | /tasks      | Create a task  |
| GET    | /tasks      | Get all tasks  |
| GET    | /tasks/{id} | Get task by ID |
| PUT    | /tasks/{id} | Update a task  |
| DELETE | /tasks/{id} | Delete a task  |

More endpoints will be added in future versions.

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/studyflow.git
```

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

Swagger Documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# 📅 Development Roadmap

### Phase 1

* Project Setup
* FastAPI Setup
* React Setup

### Phase 2

* CRUD APIs
* React Integration

### Phase 3

* Search & Filtering
* Progress Dashboard

### Phase 4

* UI Improvements
* Validation
* Documentation

### Phase 5

* Final Testing
* Deployment Preparation

---

# 🎯 Learning Objectives

This project is helping me improve my understanding of:

* React
* Tailwind CSS
* FastAPI
* REST APIs
* JSON Storage
* CRUD Operations
* Component-Based Architecture
* Frontend & Backend Integration
* Software Engineering Best Practices

---

# 📌 Project Status

**Version:** v0.1

🚧 This project is currently under active development and new features will be added incrementally.

---


