🎯 Quiz Application (MERN Stack)

A full-stack Quiz Application built with the MERN stack (MongoDB, Express, React, Node.js).
It allows users to register, log in, take quizzes, track their progress, and manage their sessions securely with JWT authentication.

✨ Features

🔐 Authentication

Register, Login, Logout with JWT

Password hashing with bcrypt

🏠 Dashboard

User dashboard with quiz categories

Progress bar to visualize quiz performance

❓ Quizzes

Take quizzes from different categories (JavaScript, HTML, CSS, etc.)

Randomized questions with scoring system

📊 Progress Tracking

Track completed quizzes and scores

🌐 Responsive UI

React + Tailwind CSS design

Works across desktop and mobile

🛠️ Tech Stack

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB Atlas

Authentication: JWT, bcrypt

⚙️ Installation
1. Clone Repository
git clone https://github.com/your-username/quiz-app.git](https://github.com/dkvishwak44-code/Quiz.git
cd quiz-app

2. Setup Backend
cd server
npm install


Create a .env file inside server/ with:

PORT=5000
MONGO_URI= our_mongodb-connection_string

Run backend:

npm start

3. Setup quizz
cd  quizz
npm install
npm run dev

5. Run App

Frontend → http://localhost:5173

Backend → http://localhost:5000




Database: MongoDB Atlas

📌 API Endpoints
Auth Routes

POST /register → Register new user

POST /login → Login user

POST /logout → Logout

Quiz Routes

GET /questions/:category → Get 10 random questions by category

POST /progress → Submit answers & get score

👨‍💻 Author

Developed by Dinesh Vishwakarma 🚀

