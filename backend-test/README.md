# 🧪 Complete API Testing Flow (Postman)
# Helpdesk Backend API

A RESTful backend API for a Company Helpdesk System built using Node.js, Express, MongoDB Atlas, and JWT Authentication.

---

## 📌 Features

- User Authentication (JWT)
- Role-Based Access Control (MANAGER, SUPPORT, USER)
- Ticket Creation & Assignment
- Comment System
- Status Logs
- MongoDB Atlas Integration
- Swagger API Documentation

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Swagger

---


---

# 🔐 Authentication Flow

1. Register user
2. Login to receive JWT token
3. Use token in Authorization → Bearer Token
4. Access protected routes

---

# 👥 User Roles

| Role     | Permissions |
|----------|------------|
| MANAGER  | Create users, assign tickets, view all |
| SUPPORT  | Comment on assigned tickets |
| USER     | Create tickets |

---

# 📡 API Endpoints

---

## 🔹 Authentication

### Register User

POST  
## ⚙️ Setup Instructions

### 1️⃣ Clone Repository


Follow this exact order to verify the system:

---

## Step 1: Register Manager

POST  
http://localhost:5000/api/auth/register  

Body:

{
  "name": "Pari",
  "email": "Pari@gmail.com",
  "password": "123456",
  "role": "MANAGER"
}

Expected: 201 Created

---

## Step 2: Login Manager

POST  
http://localhost:5000/api/auth/login  

Body:

{
  "email": "Pari@gmail.com",
  "password": "123456"
}

Expected: JWT token in response  
Copy this token.

---

## Step 3: Create SUPPORT User (Manager Only)

POST  
http://localhost:5000/api/users  

Authorization: Bearer Token (Manager Token)

Body:

{
  "name": "Pari",
  "email": "pari@gmail.com",
  "password": "123456",
  "role": "SUPPORT"
}

Expected: 201 Created

---

## Step 4: Login SUPPORT

POST  
http://localhost:5000/api/auth/login  

Body:

{
  "email": "pari@gmail.com",
  "password": "123456"
}

Expected: JWT token

---

## Step 5: Register USER

POST  
http://localhost:5000/api/auth/register  

Body:

{
  "name": "Pari",
  "email": "pari@gmail.com",
  "password": "123456",
  "role": "USER"
}

---

## Step 6: Login USER

POST  
http://localhost:5000/api/auth/login  

Copy USER token.

---

## Step 7: Create Ticket (USER)

POST  
http://localhost:5000/api/tickets  

Authorization: Bearer Token (USER)

Body:

{
  "title": "Laptop not booting",
  "description": "My office laptop does not start after update",
  "priority": "MEDIUM"
}

Expected: 201 Created  
Copy the _id of ticket.

---

## Step 8: Assign Ticket (MANAGER)

PATCH  
http://localhost:5000/api/tickets/{ticketId}/assign  

Authorization: Bearer Token (Manager)

Body:

{
  "supportId": "SUPPORT_USER_ID",
  "supportName": "Pari"
}

Expected: 200 OK

---

## Step 9: Add Comment (SUPPORT)

POST  
http://localhost:5000/api/tickets/{ticketId}/comment  

Authorization: Bearer Token (Support)

Body:

{
  "comment": "We are checking the issue"
}

Expected: 200 OK