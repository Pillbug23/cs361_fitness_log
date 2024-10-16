# 🏋️‍♂️ CS361 Fitness Tracker

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
git clone https://github.com/Pillbug23/cs361_fitness_tracker.git  
cd cs361_fitness_tracker  
Install Dependencies:  

For the Frontend:  

bash
Copy code
cd client
npm install
For the Backend:
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
Start the Backend Server:
bash
Copy code
cd server
npm start
Start the Frontend:
bash
Copy code
cd client
npm start
Access the Application:
Open your browser and navigate to http://localhost:3000 to access the application.

