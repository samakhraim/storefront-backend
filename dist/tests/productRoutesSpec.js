"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const pg_1 = require("pg");
const request = (0, supertest_1.default)(server_1.default);
const userStore = new user_1.UserStore();
let token;
const devPool = new pg_1.Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
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
        token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
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
            await devPool.query('INSERT INTO products (name, price) VALUES ($1, $2) ON CONFLICT DO NOTHING', [product.name, product.price]);
        }
    });
});
//# sourceMappingURL=productRoutesSpec.js.map