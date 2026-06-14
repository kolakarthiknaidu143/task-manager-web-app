# 🚀 Task Manager Web App

A modern **Task Manager Web Application** built using **HTML, CSS, JavaScript, Node.js, Express.js, MongoDB Atlas, and JWT Authentication**.

This application helps users securely manage their daily tasks with features like **task creation, editing, completion tracking, search, delete, and secure login system**.

---

## ✨ Features

✅ User Registration  
✅ User Login & Logout  
✅ JWT Authentication  
✅ Add Tasks  
✅ Edit Tasks  
✅ Complete Tasks  
✅ Delete Tasks  
✅ Search Tasks  
✅ Task Statistics Dashboard  
✅ MongoDB Atlas Database  
✅ Responsive Premium UI

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Authentication
- JWT (JSON Web Token)

---

## 📂 Project Structure

```text
TaskManagerApp/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── style.css
│   └── script.js
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone YOUR_REPOSITORY_LINK
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root folder and add:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

### 4️⃣ Run Backend Server

```bash
npm run dev
```

You should see:

```text
Server running on port 5000
MongoDB Connected
```

### 5️⃣ Run Frontend

Open:

```text
frontend/login.html
```

using **Live Server** in VS Code.

---

## 🔐 Authentication Flow

- User logs in with email & password
- Backend generates a **JWT Token**
- Token is stored in browser **localStorage**
- Protected routes verify token before access

---

## 📸 Screenshots

### Dashboard UI

(Add project screenshot here)

---

## 🚀 Future Improvements

- Dark / Light Mode
- Drag & Drop Tasks
- Task Reminders
- Notifications
- AI Task Suggestions

---

## 👨‍💻 Author

**Karthik**

Built with ❤️ using MERN technologies.
