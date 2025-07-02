from flask import Flask, render_template, jsonify, abort
import json
import os
import yaml

app = Flask(__name__)

# Load lesson data
def load_lessons():
    with open('data/lessons.json') as f:
        return json.load(f)

@app.route('/')
def home():
    lessons = load_lessons()
    return render_template('index.html', lessons=lessons)

@app.route('/lesson/<int:lesson_id>')
def lesson(lesson_id):
    lessons = load_lessons()
    lesson = next((l for l in lessons if l['id'] == lesson_id), None)
    if lesson is None:
        abort(404)
    # Try to load in-depth lesson YAML or JSON if it exists
    in_depth = None
    yml_path = f"data/lesson_{lesson_id}.yaml"
    json_path = f"data/lesson_{lesson_id}.json"
    if os.path.exists(yml_path):
        with open(yml_path, encoding='utf-8') as f:
            in_depth = yaml.safe_load(f)
    elif os.path.exists(json_path):
        with open(json_path, encoding='utf-8') as f:
            in_depth = json.load(f)
    return render_template('lesson.html', lesson=lesson, in_depth=in_depth)

@app.route('/api/lessons')
def api_lessons():
    return jsonify(load_lessons())

@app.route('/api/lesson/<int:lesson_id>')
def api_lesson(lesson_id):
    lessons = load_lessons()
    lesson = next((l for l in lessons if l['id'] == lesson_id), None)
    if lesson is None:
        abort(404)
    return jsonify(lesson)

@app.route('/minigame')
def minigame():
    return render_template('minigame.html')

@app.route('/minigame-matching')
def minigame_matching():
    return render_template('minigame_matching.html')

@app.route('/minigame-quiz')
def minigame_quiz():
    return render_template('minigame_quiz.html')

@app.route('/minigame-sorting')
def minigame_sorting():
    return render_template('minigame_sorting.html')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
