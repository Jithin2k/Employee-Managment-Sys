# 🚀 Employee Management System

A full-stack Employee Management System built using the MERN stack. This project focuses on implementing real-world features like authentication, protected routes, and efficient data handling using backend-driven logic.

---

## 🔑 Key Features

### 🔐 Authentication & Security

* JWT-based authentication
* Protected routes using middleware
* Token stored in frontend and sent via Axios interceptor
* Unauthorized users are restricted from accessing dashboard

---

### 👨‍💼 Employee Management (CRUD)

* Create, Read, Update, Delete employees
* View detailed employee information
* Clean and responsive UI

---

### ⚡ Backend-Based Data Handling

Instead of handling everything in frontend, this project uses backend-driven logic:

#### 🔍 Search

* Search by name or email
* Implemented using MongoDB regex

#### 🎯 Filter

* Filter by department and status
* Dynamic query building in backend

#### 🔃 Sorting

* Sort by name or salary
* Supports ascending and descending order

#### 📄 Pagination

* Implemented using `skip` and `limit`
* Improves performance for large datasets

---

## 🧠 Concepts Used

* JWT Authentication (stateless)
* Middleware for route protection
* Axios Interceptors for token handling
* Debounced search (performance optimization)
* Dynamic query building in backend
* REST API design

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## ⚙️ Instructions to Run Locally

### 1. Clone Repository

```bash
git clone https://github.com/your-username/Employee-Managment-Sys.git
cd Employee-Managment-Sys
```

---

### 2. Setup Backend (Server)

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://jithinjmadhav_db_user:Jithin2k@cluster0.xfali4d.mongodb.net/?appName=Cluster0
JWT_SECRET_KEY=secretkey123
```

Run backend server:

```bash
npm run dev
```

---

### 3. Setup Frontend (Client)

```bash
cd client
npm install
npm run dev
```

---

### 4. Open in Browser

```
http://localhost:5173
```

---

## 🔐 Demo Credentials

```
Email: admin@test.com
Password: admin123
```

---

## 📦 Backend Scripts

From your `server/package.json`:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

## ⚠️ Assumptions

* The application is designed for **admin-only access**
* Authentication is simplified (static credentials used for demo)
* No role-based access implemented (can be extended)
* Pagination limit is fixed (5 users per page)
* Backend handles filtering, sorting, and searching for scalability

---

## 👨‍💻 Author

**Jithin J Madhav**

---

## ⭐

If you found this useful, consider giving it a star!
