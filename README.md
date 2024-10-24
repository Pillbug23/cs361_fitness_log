# 🏋️‍♂️ CS361 Fitness Log

## Overview
The **Fitness Tracker Application** is a full-stack solution designed to empower users to monitor their **calorie intake**, **exercise routines**, **water consumption**, and **weight changes** over time. With a user-friendly interface and robust features, this application provides an effective way for individuals to manage and achieve their fitness goals.

[🎥 Watch Demo Video](https://cdnapisec.kaltura.com/p/391241/embedPlaykitJs/uiconf_id/44855082?iframeembed=true&entry_id=1_vq2qxnm8&config%5Bprovider%5D=%7B%22widgetId%22%3A%221_ahn26a1f%22%7D&config%5Bplayback%5D=%7B%22startTime%22%3A0%7D)

---

## 🌟 Features
- **Calorie Tracking:** Effortlessly log daily calorie intake and track your progress over time.
- **Exercise Logging:** Maintain a detailed record of exercises performed and calories burned.
- **Water Intake Monitoring:** Ensure adequate hydration by tracking your daily water consumption.
- **Weight Tracking:** Visualize weight changes to monitor your progress towards fitness goals.
- **User Authentication:** Secure user authentication powered by **Auth0**.
- **Data Visualization:** Gain insights with integrated **Google Charts** for calorie and weight trends.

---

## 🛠️ Technology Stack
- **Frontend:** React, Bootstrap
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Authentication:** Auth0
- **Data Visualization:** Google Charts

---

## 🚀 Setup and Installation

### Clone the Repository:
git clone https://github.com/Pillbug23/cs361_fitness_tracker.git  <br>
cd cs361_fitness_tracker  <br>
Install Dependencies:  <br>

For the Frontend:  <br>
cd client<br>
npm install<br>

For the Backend:<br>
cd server<br>
npm install<br>

Set Up Environment Variables:<br>
Create a .env file in the root of the server and add the necessary environment variables:<br>
AUTH0_DOMAIN=your-auth0-domain<br>
AUTH0_CLIENT_ID=your-auth0-client-id<br>
AUTH0_CLIENT_SECRET=your-auth0-client-secret<br>
MYSQL_HOST=your-mysql-host<br>
MYSQL_USER=your-mysql-user<br>
MYSQL_PASSWORD=your-mysql-password<br>
MYSQL_DATABASE=your-mysql-database<br>

Start the Application:<br>
Start the Backend Server:<br>
cd server<br>
npm start<br>

Start the Frontend:<br>
cd client<br>
npm start<br>

Access the Application:<br>
Open your browser and navigate to http://localhost:3000 to access the application.<br>

