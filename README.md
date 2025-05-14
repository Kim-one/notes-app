# 📝 Notes App

A full-stack notes application built with the MEAN stack (MongoDB, Express.js, AngularJS, Node.js). Users can create, view, update, delete, and filter notes in a clean, responsive UI.

## 🚀 Features
- Create, read, update, and delete (CRUD) notes
- RESTful API integration using Express.js
- AngularJS front-end with dynamic UI
- MongoDB database for document storage
- Note filtering for improved usability

## 🛠️ Technologies
- **Front-end:** AngularJS, HTML5, CSS3
- **Back-end:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Tools:** Git, Postman, Visual Studio Code

## 📁 Project Structure
/client # AngularJS front-end
/server # Node.js + Express backend
/models # Mongoose schemas
/routes # API route definitions

## 📦 Installation
```bash
# Clone the repository
git clone https://github.com/Kim-one/notes-app.git
cd notes-app

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

▶️ Running the App
Start the backend:
cd server
node index.js

Start the frontend:

cd ../client
ng serve
Visit: http://localhost:4200

**✨ Future Improvements**
User authentication with JWT

Deployment using Docker or Vercel

Enhanced UI/UX with animations
