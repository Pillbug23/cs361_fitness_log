# cs361_fitness_tracker

Fitness Tracker Application
Overview
This project is a full-stack fitness tracking application that allows users to monitor their calorie intake, exercise routines, water consumption, and weight changes over time. The application provides a comprehensive solution for users looking to manage and achieve their fitness goals effectively.

<iframe id="kaltura_player" src='' style="width: 640px;height: 420px;border: 0;" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-downloads allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" title="Kaltura Capture recording - May 27th 2024, 4:21:02 pm"></iframe>

<video width="640" height="420" controls>
    <source src="[https://path_to_your_video.mp4](https://cdnapisec.kaltura.com/p/391241/embedPlaykitJs/uiconf_id/44855082?iframeembed=true&entry_id=1_vq2qxnm8&config%5Bprovider%5D=%7B%22widgetId%22%3A%221_ahn26a1f%22%7D&config%5Bplayback%5D=%7B%22startTime%22%3A0%7D)" type="video/mp4">
    Your browser does not support the video tag.
</video>

# Features
Calorie Tracking: Log daily calorie intake through food entries and track progress over time.<br>
Exercise Logging: Keep a detailed record of exercises performed and calories burned.<br>
Water Intake Monitoring: Track daily water consumption to ensure adequate hydration.<br>
Weight Tracking: Chart and visualize weight changes to monitor progress towards fitness goals.<br>
User Authentication: Secure user authentication using Auth0.<br>
Data Visualization: Integrated Google Charts to provide visual insights into calorie and weight trends.<br>

Frontend: React, Bootstrap<br>
Backend: Node.js, Express<br>
Database: MySQL<br>
Authentication: Auth0<br>
Data Visualization: Google Charts<br>

# Setup and Installation

Clone the Repository:

bash<br>
Copy code<br>
git clone https://github.com/Pillbug23/cs361_fitness_tracker.git<br>
cd cs361_fitness_tracker<br>

# Install Dependencies:

For the frontend:<br>
bash<br>
Copy code<br>
cd client<br>
npm install<br>
<br>
For the backend:<br>
bash<br>
Copy code<br>
cd server<br>
npm install<br>
Set Up Environment Variables:

# Create a .env file in the root of the server and add the necessary environment variables:
bash<br>
Copy code<br>
AUTH0_DOMAIN=your-auth0-domain<br>
AUTH0_CLIENT_ID=your-auth0-client-id<br>
AUTH0_CLIENT_SECRET=your-auth0-client-secret<br>
MYSQL_HOST=your-mysql-host<br>
MYSQL_USER=your-mysql-user<br>
MYSQL_PASSWORD=your-mysql-password<br>
MYSQL_DATABASE=your-mysql-database<br>
Start the Application:<br>

# Start the backend server:
bash<br>
Copy code<br>
cd server<br>
npm start<br>

# Start the frontend:
bash<br>
Copy code<br>
cd client<br>
npm start<br>
Access the Application:<br>

Open your browser and go to http://localhost:3000 to access the application.



