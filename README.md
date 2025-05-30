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

### Deployment:
- Render.com (both client and server)

## ⚙️ Setup Instructions

### ✅ Prerequisites

- Node.js (v16 or newer)
- MongoDB (or use mock data)
- Git

### 🔧 Local Development

#### 1. Clone the Repository
git clone https://github.com/your-username/ev-charging-map.git
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
