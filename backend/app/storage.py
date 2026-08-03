import json
import os

FILE_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "tasks.json")

def load_tasks():
    if not os.path.exists(FILE_PATH):
        return []
    try:
        with open(FILE_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []

def save_tasks(tasks):
    with open(FILE_PATH, "w", encoding="utf-8") as f:
        json.dump(tasks, f, indent=2)