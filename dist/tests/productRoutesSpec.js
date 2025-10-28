"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const request = (0, supertest_1.default)(server_1.default);
const store = new user_1.UserStore();
let token;
describe('Product Endpoints', () => {
    beforeAll(async () => {
        const user = await store.create({
            first_name: 'ProdTester',
            last_name: 'User',
            password: '123'
        });
        token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
    });
    it('POST /products should create a product', async () => {
        const res = await request
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Phone', price: 999 });
        expect(res.status).toBe(200);
    });
    it('GET /products should list products', async () => {
        const res = await request.get('/products');
        expect(res.status).toBe(200);
    });
    it('GET /products/:id should return a product', async () => {
        const res = await request.get('/products/1');
        expect(res.status).toBe(200);
    });
    it('PUT /products/:id should update a product', async () => {
        const res = await request
            .put('/products/1')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Updated Phone', price: 899 });
        expect(res.status).toBe(200);
    });
    it('DELETE /products/:id should delete a product', async () => {
        const res = await request
            .delete('/products/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
});
//# sourceMappingURL=productRoutesSpec.js.map