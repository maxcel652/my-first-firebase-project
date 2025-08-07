Maxcel's Todo App
A full-stack todo application built with React, Firebase, and Tailwind CSS. This project demonstrates core concepts of a modern web application, including user authentication, real-time data management, and responsive design.


✨ Features

User Authentication: Secure sign-up, login, and logout functionality using Firebase Authentication.

User-Specific Todos: Each user has their own private list of todos, ensuring data is isolated and secure.

Password Reset: A "Forgot Password" feature allows users to reset their password via email.

Real-time Data: Todos are stored in a Firestore database, with real-time updates that reflect instantly across all connected clients.

CRUD Operations: Full functionality to Create, Read, Update, and Delete todos.

Toast Notifications: User-friendly toast messages for successful login, logout, and todo creation using react-toastify.

"Show Password" Toggle: A feature to toggle password visibility during login.

Production-Ready Build: The application is configured for easy deployment to a hosting service like Firebase Hosting.

🚀 Getting Started
Prerequisites
Node.js and npm installed on your machine.

A Firebase project.

1. Clone the repository
Bash

git clone https://github.com/maxcel652/my-first-firebase-project.git
cd my-first-firebase-project
2. Install dependencies
Bash

npm install
3. Configure Firebase
Go to the Firebase Console and create a new project.

In your project, enable Authentication (Email/Password provider) and Firestore Database.

In the project settings, add a new web app and copy your Firebase configuration object.

Create a file named src/lib/firebase.js and paste your configuration there:

JavaScript

// src/lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
Create Firestore Index: The application uses a composite index for its queries. When you run the app, Firestore will provide a link in the browser console to automatically create this index for you. Click the link and save the index in your Firebase console.

4. Run the application
Bash

npm run dev
Your app will be available at http://localhost:5173.

⚙️ Deployment
To deploy the application to Firebase Hosting:

Build the project for production:

Bash

npm run build
Install the Firebase CLI:

Bash

npm install -g firebase-tools
Log in to your Firebase account and initialize the project:

Bash

firebase login
firebase init
(When prompted, select Hosting, choose your project, and set the public directory to dist.)

Deploy your application:

Bash

firebase deploy --only hosting

🛠️ Built With

React - A JavaScript library for building user interfaces.

Firebase - A platform for building web and mobile applications.

Firestore - A NoSQL cloud database for real-time data storage.

Tailwind CSS - A utility-first CSS framework for rapid UI development.

React-Toastify - A library for adding toast notifications.

Lucide-React - A simple and elegant icon library.
