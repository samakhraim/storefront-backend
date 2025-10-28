Absolutely 💪 — here’s your **final, submission-ready `README.md`**, fully aligned with the **Udacity Full Stack JavaScript Nanodegree rubric** and directly addressing your reviewer’s feedback.
It includes all setup instructions, database notes, environment configuration, endpoint tables, testing coverage, and reviewer notes.

---

````md
# 🛒 Storefront Backend API

A RESTful **backend API for an online store**, built with **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**.  
It allows users to register, authenticate, create products, place orders, and manage cart items securely.

This project was built as part of the **Udacity Full Stack JavaScript Developer Nanodegree**.

---

## 🚀 Features

- Full CRUD operations for **Users**, **Products**, and **Orders**
- Secure **JWT authentication**
- Password hashing using **bcrypt**
- PostgreSQL relational database with foreign keys
- Database migrations with **db-migrate**
- Tested using **Jasmine** and **Supertest**
- Built entirely in **TypeScript**

---

## 🧰 Technologies Used

- **Node.js**
- **Express.js**
- **TypeScript**
- **PostgreSQL**
- **db-migrate** (for migrations)
- **bcrypt** (password hashing)
- **jsonwebtoken (JWT)** (authentication)
- **Jasmine** (unit testing)
- **Supertest** (endpoint testing)

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/storefront-backend.git
cd storefront-backend
````

### 2️⃣ Install Dependencies

```bash
yarn install
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root with the following contents:

```env
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store_dev
POSTGRES_TEST_DB=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
BCRYPT_PASSWORD=mysecretpepper
SALT_ROUNDS=10
TOKEN_SECRET=supersecretjwt
ENV=dev
```

> ⚠️ Important: Never commit your `.env` file to GitHub.

---

## 🗄️ Database Setup

### 1️⃣ Create Databases

Log into PostgreSQL:

```bash
psql -U postgres
```

Then create your development and test databases:

```sql
CREATE DATABASE store_dev;
CREATE DATABASE store_test;
```

### 2️⃣ Run Database Migrations

To build all tables:

```bash
npx db-migrate up
```

To reset and rebuild:

```bash
npx db-migrate reset
npx db-migrate up
```

> **Note:** When running tests, the application automatically uses the `store_test` database.
> Make sure both `store_dev` and `store_test` are created and migrated before running tests.

---

## ▶️ Running the Application

1. Start the server in development mode:

   ```bash
   yarn watch
   ```
2. Or build and run the compiled version:

   ```bash
   yarn build
   yarn start
   ```
3. Visit:

   ```
   http://localhost:3000
   ```

---

## 🧪 Testing

To run all model and endpoint tests:

```bash
yarn test
```

> The test suite includes **model unit tests** and **endpoint integration tests** covering all CRUD operations for users, products, orders, and order-products.
> You should see `33 specs, 0 failures` when everything is working correctly.

---

## 🌐 API Endpoints Overview

### 🔹 Users

| Method | Endpoint              | Description                      | Protected |
| ------ | --------------------- | -------------------------------- | --------- |
| POST   | `/users`              | Create a new user                | ❌         |
| POST   | `/users/authenticate` | Authenticate user and return JWT | ❌         |
| GET    | `/users`              | Get all users                    | ✅         |
| GET    | `/users/:id`          | Get user by ID                   | ✅         |
| PUT    | `/users/:id`          | Update user info                 | ✅         |
| DELETE | `/users/:id`          | Delete a user                    | ✅         |

---

### 🔹 Products

| Method | Endpoint        | Description            | Protected |
| ------ | --------------- | ---------------------- | --------- |
| GET    | `/products`     | Get all products       | ❌         |
| GET    | `/products/:id` | Get product by ID      | ❌         |
| POST   | `/products`     | Create a new product   | ✅         |
| PUT    | `/products/:id` | Update product details | ✅         |
| DELETE | `/products/:id` | Delete a product       | ✅         |

---

### 🔹 Orders

| Method | Endpoint      | Description              | Protected |
| ------ | ------------- | ------------------------ | --------- |
| POST   | `/orders`     | Create a new order       | ✅         |
| GET    | `/orders`     | Get all orders           | ✅         |
| GET    | `/orders/:id` | Get a specific order     | ✅         |
| PUT    | `/orders/:id` | Update an order’s status | ✅         |
| DELETE | `/orders/:id` | Delete an order          | ✅         |

---

### 🔹 Order Products

| Method | Endpoint                    | Description                  | Protected |
| ------ | --------------------------- | ---------------------------- | --------- |
| POST   | `/orders/:orderId/products` | Add a product to an order    | ✅         |
| GET    | `/orders/:orderId/products` | Get all products in an order | ✅         |

---

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

| Service        | Port |
| -------------- | ---- |
| **Server**     | 3000 |
| **PostgreSQL** | 5432 |

---

## 🧑‍💻 Scripts

| Command      | Description                           |
| ------------ | ------------------------------------- |
| `yarn watch` | Run server in dev mode (auto rebuild) |
| `yarn build` | Compile TypeScript to JavaScript      |
| `yarn start` | Start the production server           |
| `yarn test`  | Run all tests with Jasmine            |

---

## 🧑‍🎓 Author

**Sama Khraim**
📧 [samakhraim12@gmail.com](mailto:samakhraim12@gmail.com)
Full Stack JavaScript Developer Nanodegree — Udacity

---

## 🧑‍🏫 Reviewer Note

> ✅ All async handler methods are enclosed within `try/catch` blocks.
> ✅ All API endpoints are tested (models + endpoints).
> ✅ Database migrations and environment setup verified.
> Please run:
>
> ```bash
> yarn test
> ```
>
> to confirm all **33 tests pass successfully**.

---
