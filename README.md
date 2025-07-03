Appointment Booking System 🏥💇‍♀️

A full-stack **Appointment Booking Platform** built with **Node.js**, **Express**, **PostgreSQL (via Sequelize)**, and **JWT Auth**, designed for real-world use cases like clinics, salons, or service providers.

---

## 🚀 Features

### ✅ User Side
- Register/Login with JWT
- Browse services offered by providers
- Book appointments with time-slot selection
- View and cancel own bookings

### ✅ Provider Dashboard
- Create and update business profile
- Add, update, and delete services
- View all bookings with customer details
- Approve, reject, or complete appointments

### ✅ Admin Panel
- View all users and providers
- Ban or unban users
- Delete users and cascade related data
- View platform statistics

### 🔒 Auth & Access
- JWT-based Authentication
- Role-based Access Control (User, Provider, Admin)
- Middleware-secured routes

---

## 🧠 Tech Stack

| Tech             | Purpose                         |
|------------------|----------------------------------|
| **Node.js**      | Backend runtime                 |
| **Express.js**   | RESTful API framework           |
| **PostgreSQL**   | Primary database                |
| **Sequelize ORM**| Models, migrations, queries     |
| **JWT**          | Secure user authentication      |
| **Multer**       | Image upload for services       |

---

## 📂 Folder Structure

.
├── app.js
├── server.js
├── routes/
├── controllers/
├── models/ ← Sequelize models
├── middlewares/
├── uploads/ ← Service images
├── config/ ← DB config
