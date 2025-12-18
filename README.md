# Garments Order & Production Tracker System – Backend

Powerful, secure, and scalable **REST API server** for managing garment production, orders, users, and tracking. This backend powers a full **role-based system** used by **Admins, Managers, and Buyers**.

---

## 🔗 Live API Server
👉 coming soon...

---

## 🎯 Project Overview
This backend is responsible for handling all core business logic of the system, including:
- Secure authentication
- Role-based access control
- Product & inventory management
- Order processing
- Production tracking
- Admin analytics

It is built with **real-world production security practices** in mind.

---

## 🚀 Core Features (API Responsibilities)

### 🔐 Authentication & Security
- JWT-based authentication
- HTTP-only cookie token storage
- Role-based API protection (Admin, Manager, Buyer)

### 👤 User Management
- Fetch all users
- Update user roles
- Suspend users with feedback & reason

### 📦 Product Management
- Add new products (Manager)
- Update & delete products
- Home page product control

### 🧾 Order & Booking System
- Place orders (Buyer)
- Approve or reject orders (Manager & Admin)
- View all orders (Admin)

### 🚚 Production Tracking
- Add production progress updates
- View timeline-based tracking history
- Read-only tracking for buyers

### 📊 Admin Analytics (Optional Extension)
- Product stats
- Order stats
- User growth monitoring

---

## 🛠️ Technologies Used

### Core Stack
- Node.js
- Express.js
- MongoDB Atlas

### Security & Utilities
- JWT Authentication
- Cookie Parser
- CORS
- dotenv
- Multer (for image uploads – optional)

### Deployment
- Vercel (as serverless function)
- MongoDB Atlas

---

## 🔐 Authentication System
- Firebase authentication handled on the frontend
- Backend issues JWT after verification
- Token stored in **HTTP-only cookies**
- Secure role-based API protection

---

## 📁 Backend Folder Structure

```
server/
 ├─ routes/
 ├─ middlewares/
 ├─ models/
 ├─ config/
 ├─ index.js
 └─ .env
```

---

## 🧾 API Endpoints Overview

### 🔐 Auth
```
POST /jwt
```

### 👤 Users
```
GET    /api/users?email=useremail
POST   /api/users
PATCH  /users/role/:id
PATCH  /users/suspend/:id
```

### 📦 Products
```
POST   /products
GET    /products
GET    /products/home
PATCH  /products/:id
DELETE /products/:id
```

### 🧾 Orders
```
POST   /orders
GET    /orders/user/:email
GET    /orders/all
PATCH  /orders/approve/:id
PATCH  /orders/reject/:id
```

### 🚚 Tracking
```
POST /tracking
GET  /tracking/:orderId
```

### Admin
```
Get /api/admin/users
```

---

## ⚙️ Installation & Run Locally

```bash
git clone https://github.com/your-username/server-repo.git
cd server-repo
npm install
nodemon index.js
```

---

## 🔑 Environment Variables (`.env`)

```env
PORT=5000
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=production
```

---

## ✅ Deployment Checklist

- MongoDB Atlas Connected
- CORS Enabled
- Cookies Enabled
- JWT Secured
- Role-Based Middleware Implemented
- Reload-safe API Routes

---

## 🧰 Used Tools & Others
- mongoose
- dotenv
- firebase admin
- Postman (API Testing)
- MongoDB Atlas Website
- Vercel Deployment

---

## 📅 Project Timeline
- Started: 9 Dec 2025
- Completed on: 
- Last Updated: --

---

## 👨‍💻 Developer Info

Name: Nayem Ahmed  
Role: MERN Stack Developer  
Portfolio: https://nayem-ahmed.vercel.app  
GitHub: https://github.com/nayem-ahmedz  
LinkedIn: https://linkedin.com/in/nayem-ahmedz  

---

Feel free to contact me for any backend-related queries, collaboration, or improvements.