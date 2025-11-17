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
const userStore = new user_1.UserStore();
let token;
let userId;
let orderId;
describe('Order Endpoints', () => {
    beforeAll(async () => {
        const user = await userStore.create({
            first_name: 'TestUser',
            last_name: 'Orders',
            email: 'orders@example.com',
            password: 'test123'
        });
        userId = user.id;
        token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
    });
    it('POST /orders should create an order', async () => {
        const res = await request
            .post('/orders')
            .set('Authorization', `Bearer ${token}`)
            .send({ user_id: userId, status: 'active' });
        expect(res.status).toBe(200);
        orderId = res.body.id;
    });
    it('GET /orders should list all orders', async () => {
        const res = await request
            .get('/orders')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    it('GET /orders/:id should return one order', async () => {
        const res = await request
            .get(`/orders/${orderId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    it('PUT /orders/:id should update order status', async () => {
        const res = await request
            .put(`/orders/${orderId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ status: 'complete' });
        expect(res.status).toBe(200);
    });
    it('DELETE /orders/:id should delete the order', async () => {
        const res = await request
            .delete(`/orders/${orderId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
});
//# sourceMappingURL=orderSpec.js.map