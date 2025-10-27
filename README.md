
# 🛒 Storefront Backend API

A RESTful **backend API for an online store**, built with **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**.
It allows users to register, authenticate, create products, place orders, and manage cart items securely.

This project was built as part of the **Udacity Full Stack JavaScript Developer Nanodegree**.

---

## 🚀 Features

* Full CRUD operations for **Users**, **Products**, and **Orders**
* Secure **JWT authentication**
* Password hashing using **bcrypt**
* PostgreSQL relational database with foreign keys
* Tested using **Jasmine** and **Supertest**
* Built in **TypeScript** with Express server

---

## 🧰 Technologies Used

* **Node.js**
* **Express.js**
* **TypeScript**
* **PostgreSQL**
* **db-migrate** (for migrations)
* **bcrypt**
* **jsonwebtoken (JWT)**
* **Jasmine** (unit testing)

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/storefront-backend.git
cd storefront-backend
```

### 2. Install dependencies

```run
yarn install
```

---

## 🗄️ Database Setup

### 1. Create the databases

Log into PostgreSQL:

```bash
psql -U postgres
```

Then create the development and test databases:

```sql
CREATE DATABASE store_dev;
CREATE DATABASE store_test;
```


### 2. Run database migrations

```run
npx db-migrate up
```

To reset and rebuild your database:

```run
npx db-migrate reset
npx db-migrate up
```

---

## 🧑‍💻 Scripts

| Command      | Description                                 |
| ------------ | ------------------------------------------- |
| `yarn watch` | Start the server in dev mode (auto rebuild) |
| `yarn build` | Compile TypeScript files into `dist/`       |
| `yarn start` | Run the compiled project                    |
| `yarn test`  | Run all tests with Jasmine                  |

---

## 🌐 API Information

### Base URL

```
http://localhost:3000
```

### Example Endpoints

**Users**

* `POST /users` → Create a new user
* `POST /users/authenticate` → Login and get a token
* `GET /users` → List all users *(requires token)*

**Products**

* `GET /products` → Get all products
* `POST /products` → Create a product *(requires token)*

**Orders**

* `POST /orders` → Create a new order *(requires token)*
* `GET /orders/:id` → Get order details *(requires token)*
* `POST /orders/:orderId/products` → Add a product to an order *(requires token)*

---

## 🧪 Testing

To run all model and endpoint tests:

```run
yarn test


## 📂 Project Structure

```
storefront-backend/
│
├── src/
│   ├── server.ts
│   ├── database.ts
│   ├── models/
│   ├── handlers/
│   ├── middleware/
│   └── tests/
│
├── migrations/
├── database.json
├── package.json
├── tsconfig.json
├── .env (ignored)
├── REQUIREMENTS.md
└── README.md
```

---

## ⚙️ Ports

* **Server:** 3000
* **Database:** 5432

---


## 🧑‍🎓 Author

**Sama Khraim**
📧 [samakhraim12@gmail.com](mailto:samakhraim12@gmail.com)
Full Stack JavaScript Developer Nanodegree — Udacity



