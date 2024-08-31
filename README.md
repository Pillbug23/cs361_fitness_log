# cs361_fitness_tracker

Fitness Tracker Application
Overview
This project is a full-stack fitness tracking application that allows users to monitor their calorie intake, exercise routines, water consumption, and weight changes over time. The application provides a comprehensive solution for users looking to manage and achieve their fitness goals effectively.

# Features
Calorie Tracking: Log daily calorie intake through food entries and track progress over time.<br>
Exercise Logging: Keep a detailed record of exercises performed and calories burned.<br>
Water Intake Monitoring: Track daily water consumption to ensure adequate hydration.<br>
Weight Tracking: Chart and visualize weight changes to monitor progress towards fitness goals.<br>
User Authentication: Secure user authentication using Auth0.<br>
Data Visualization: Integrated Google Charts to provide visual insights into calorie and weight trends.<br>
Microservices Architecture: The application is designed using microservices to ensure scalability and ease of maintenance.<br>

Frontend: React, Bootstrap
Backend: Node.js, Express
Database: MySQL
Authentication: Auth0
Data Visualization: Google Charts
Setup and Installation
Clone the Repository:

bash
Copy code
git clone https://github.com/Pillbug23/cs361_fitness_tracker.git
cd cs361_fitness_tracker
Install Dependencies:

For the frontend:
bash
Copy code
cd client
npm install
For the backend:
bash
Copy code
cd server
npm install
Set Up Environment Variables:

Create a .env file in the root of the server and add the necessary environment variables:
bash
Copy code
AUTH0_DOMAIN=your-auth0-domain
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
MYSQL_HOST=your-mysql-host
MYSQL_USER=your-mysql-user
MYSQL_PASSWORD=your-mysql-password
MYSQL_DATABASE=your-mysql-database
Start the Application:

Start the backend server:
bash
Copy code
cd server
npm start
Start the frontend:
bash
Copy code
cd client
npm start
Access the Application:

Open your browser and go to http://localhost:3000 to access the application.
Usage
Sign Up: Create an account using Auth0 to start tracking your fitness journey.
Log Entries: Input your daily food, exercise, and water intake.
Visualize Data: Use the integrated charts to see your progress and make informed decisions about your fitness goals.


