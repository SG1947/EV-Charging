# ⚡ EV Charging Stations Map Application

An interactive web application that displays EV charging stations across regions . Users can view real-time station details including status, power output, and connector type.
The app is built with Vue 3 and powered by a Node.js/Express backend.


## 🌍 Live Demo

 **Frontend**: [https://ev-charging-3wyl.onrender.com]
 **Backend API**: [https://ev-charging-backend-9uub.onrender.com/api]

## 📁 Project Structure

/backend → Express.js API for station data
/frontend → Vue 3 application with Leaflet and OpenStreetMap.

## 🛠 Tech Stack

### Frontend:
- Vue 3 
- Leaflet.js(OpenStreetMap.) for mapping
- Axios for HTTP requests

### Backend:
- Node.js & Express
- MongoDB 
- JWT for auth 

Here’s a sample `README.md` section you can use to describe how your **EV Charging** site works:

---

## 🌐 How the EV Charging Site Works

### 🚀 Accessing the Site

* **Live Link**: When you open the live site, it will automatically redirect you to the `/chargers` page.
* **Chargers Page**:

  * You'll see a list of all available EV chargers along with their details.
  * There's also an integrated **map view** that visually displays the charger locations for easier navigation.

### 🔐 Authentication & User Features

* **Navigation Bar**:

  * You'll find a **Login** option in the navbar.
  * On the **Login Page**, new users can also **register** for an account.

* **After Login**:

  * Logged-in users can:

    * **Add a new charger**
    * **Edit existing chargers**
    * **Delete chargers**
  * These features are **auth-protected**, meaning only authenticated users have access to manage charger data.

### ⏳ Please Note

* The page might take a few moments to load because the **backend is deployed separately** from the frontend. Thank you for your patience!



## ⚙️ Setup Instructions

### ✅ Prerequisites

- Node.js (v16 or newer)
- MongoDB (or use mock data)
- Git

### 🔧 Local Development

#### 1. Clone the Repository
git clone https://github.com/SG1947/EV-Charging.git
cd ev-charging-map
cd backend
npm install

#### 2. Backend Setup

cd backend
npm install

Create a .env file:
PORT=4000
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>

Run backend:
node server.js
Backend will be at http://localhost:4000.

#### 3. Frontend Setup

cd ../frontend
npm install
npm run dev
Frontend will be at http://localhost:5173.


#### Deployment on Render
# Frontend:
Connect your GitHub repo on Render.

Set Build Command: npm install && npm run build

Set Publish Directory: dist

# Backend:
Add another Render service for /backend

Set environment variables from your .env file

Set Start Command: node server.js
