

# 🛒 Storefront Backend API

A RESTful **backend API for an online store**, built using **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**.  
It enables users to register, authenticate, manage products, create orders, and handle cart operations securely.

This project was developed as part of the **Udacity Full Stack JavaScript Developer Nanodegree**.

---

## 🚀 Features

- Full CRUD operations for **Users**, **Products**, and **Orders**
- Secure authentication using **JWT (JSON Web Token)**
- Password hashing and salting with **bcrypt**
- PostgreSQL relational database with foreign key relationships
- Database version control using **db-migrate**
- Comprehensive **unit and integration testing** with Jasmine & Supertest
- Written in **TypeScript** for strong typing and maintainability

---

## 🧰 Technologies Used

- **Node.js** & **Express.js**
- **TypeScript**
- **PostgreSQL**
- **db-migrate** (migrations)
- **bcrypt** (password security)
- **jsonwebtoken (JWT)** (authentication)
- **Jasmine** & **Supertest** (testing framework)

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

Create a `.env` file in the project root with the following configuration:

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

> ⚠️ **Important:** Never commit your `.env` file to GitHub.
> It contains sensitive database credentials and secret keys.

---

## 🗄️ Database Setup

### 1️⃣ Create Databases

Log into PostgreSQL:

```bash
psql -U postgres
```

Then create the development and test databases:

```sql
CREATE DATABASE store_dev;
CREATE DATABASE store_test;
```

### 2️⃣ Run Database Migrations

To build all tables:

```bash
npx db-migrate up
```

To reset and rebuild the database:

```bash
npx db-migrate reset
npx db-migrate up
```

> 💡 When running tests, the app automatically connects to the **`store_test`** database.
> Make sure both databases are created and migrated before running tests.

---

## ▶️ Running the Application

Start the app in development mode (auto-reload):

```bash
yarn watch
```

Or build and run the production version:

```bash
yarn build
yarn start
```

Then visit the API in your browser or Postman:

```
http://localhost:3000
```

---

## 🧪 Testing

To run all tests (models + endpoints):

```bash
yarn test
```

> ✅ The test suite covers **all API routes**, **database models**, and **authentication flow**.
> A successful test run will output:
> **`33 specs, 0 failures`**

---

## 🌐 API Endpoints Overview

### 🔹 Users

| Method | Endpoint              | Description                     | Protected |
| ------ | --------------------- | ------------------------------- | --------- |
| POST   | `/users`              | Create a new user               | ❌         |
| POST   | `/users/authenticate` | Authenticate user and get token | ❌         |
| GET    | `/users`              | Get all users                   | ✅         |
| GET    | `/users/:id`          | Get user by ID                  | ✅         |
| PUT    | `/users/:id`          | Update user info                | ✅         |
| DELETE | `/users/:id`          | Delete a user                   | ✅         |

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

### 🔹 Order Products (Cart Items)

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
│   ├── server.ts          # Express server setup
│   ├── database.ts        # PostgreSQL connection
│   ├── models/            # Data models (User, Product, Order)
│   ├── handlers/          # Route handlers (controllers)
│   ├── middleware/        # Authentication middleware
│   └── tests/             # Unit & integration tests
│
├── migrations/            # Database migration scripts
├── database.json          # Migration configuration
├── package.json
├── tsconfig.json
├── .env                   # Environment variables (ignored by Git)
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

## 🧑‍💻 Available Scripts

| Command      | Description                        |
| ------------ | ---------------------------------- |
| `yarn watch` | Run the server in development mode |
| `yarn build` | Compile TypeScript into JavaScript |
| `yarn start` | Start the production server        |
| `yarn test`  | Run all tests with Jasmine         |

---

## 🧑‍🎓 Author

**Sama Khraim**
📧 [samakhraim12@gmail.com](mailto:samakhraim12@gmail.com)
Full Stack JavaScript Developer Nanodegree — Udacity

---



