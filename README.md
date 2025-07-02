# PeriodiPal

A web app for learning about menstrual health, puberty, and hygiene. Built with Flask and deployable to free Python hosting platforms.

## Features
- Interactive lessons and quizzes
- Mini-games
- PWA (installable on mobile)

## Project Structure
```
periodipalvs/
├── app.py
├── requirements.txt
├── data/
│   └── lessons.json
├── static/
│   ├── css/
│   ├── js/
│   ├── img/
│   └── manifest.json
├── templates/
│   ├── index.html
│   ├── lesson.html
│   ├── minigame.html
│   ├── minigame_matching.html
│   ├── minigame_quiz.html
│   └── minigame_sorting.html
├── README.md
└── .gitignore
```

## Local Development
1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
2. Run the app:
   ```
   python app.py
   ```
3. Visit [http://localhost:5000](http://localhost:5000)

## Deployment (Render, Railway, etc.)
- Connect your GitHub repo to the platform.
- Set the start command to:
  ```
  python app.py
  ```
- Make sure the platform uses Python 3 and installs from requirements.txt.

## License
MIT
