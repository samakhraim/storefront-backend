import supertest from 'supertest';
import app from '../server';
import jwt from 'jsonwebtoken';
import { UserStore } from '../models/user';
import { Pool } from 'pg';

const request = supertest(app);
const userStore = new UserStore();
let token: string;

// 👇 connect manually to the dev DB as well
const devPool = new Pool({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB, // store_dev
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
});

describe('Product Endpoints', () => {
  beforeAll(async () => {
    const user = await userStore.create({
      first_name: 'ProdTester',
      last_name: 'User',
      email: 'prod@test.com',
      password: '123'
    });
    token = jwt.sign({ user }, process.env.TOKEN_SECRET!);
  });

  it('POST /products should create multiple products', async () => {
    const products = [
      { name: 'Book', price: 15 },
      { name: 'Phone', price: 999 },
      { name: 'Laptop', price: 1999 },
      { name: 'Smartwatch', price: 299 },
      { name: 'Camera', price: 850 },
      { name: 'Tablet', price: 450 },
      { name: 'Headphones', price: 120 },
      { name: 'Keyboard', price: 180 },
      { name: 'Monitor', price: 600 },
      { name: 'Gaming Chair', price: 400 }
    ];

    for (const product of products) {
      const res = await request
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send(product);

      expect(res.status).toBe(200);
      console.log(`✅ Added: ${product.name}`);

      // 👇 optional: insert into dev database as well
      await devPool.query(
        'INSERT INTO products (name, price) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [product.name, product.price]
      );
    }
  });
});
