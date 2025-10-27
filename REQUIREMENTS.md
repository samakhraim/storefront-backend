## Project Purpose

This project is a **Storefront Backend API** built with **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**.
It provides RESTful endpoints for managing users, products, and orders for an online store.
The API includes full CRUD functionality, authentication with JWT, and secure password hashing using bcrypt.

---

## Database Schema

### Users

* id – primary key
* first_name – string
* last_name – string
* password_digest – string (hashed with bcrypt)

### Products

* id – primary key
* name – string
* price – integer

### Orders

* id – primary key
* user_id – foreign key → users.id
* status – string (active or complete)

### Order_Products (join table)

* id – primary key
* order_id – foreign key → orders.id (ON DELETE CASCADE)
* product_id – foreign key → products.id (ON DELETE CASCADE)
* quantity – integer (must be > 0)

---

## API Endpoints

### Users

* `POST /users` → create a new user
* `POST /users/authenticate` → login and get JWT token
* `GET /users` → get all users (requires token)
* `GET /users/:id` → get user by id (requires token)
* `PUT /users/:id` → update user (requires token)
* `DELETE /users/:id` → delete user (requires token)

### Products

* `POST /products` → create a product (requires token)
* `GET /products` → list all products
* `GET /products/:id` → get product by id
* `PUT /products/:id` → update product (requires token)
* `DELETE /products/:id` → delete product (requires token)

### Orders

* `POST /orders` → create a new order (requires token)
* `GET /orders` → list all orders (requires token)
* `GET /orders/:id` → get order by id (requires token)
* `PUT /orders/:id` → update order status (requires token)
* `DELETE /orders/:id` → delete order (requires token)

### Order Products (Adding products to orders)

* `POST /orders/:orderId/products` → add a product to an order (requires token)
* `GET /orders/:orderId/products` → view all products in an order (requires token)

---

## Authentication

* Passwords are hashed using **bcrypt** with salt and pepper.
* JWT tokens are used for protected routes.
* Token is returned when creating or authenticating a user.

---

## Environment Variables

The `.env` file contains the following:

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store_dev
POSTGRES_TEST_DB=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
BCRYPT_PASSWORD=your_salt
SALT_ROUNDS=10
TOKEN_SECRET=your_jwt_secret
ENV=dev
```

