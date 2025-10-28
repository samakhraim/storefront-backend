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
describe('Order Endpoints', () => {
    beforeAll(async () => {
        const user = await store.create({
            first_name: 'OrderTester',
            last_name: 'User',
            password: '123'
        });
        token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
    });
    it('POST /orders should create an order', async () => {
        const res = await request
            .post('/orders')
            .set('Authorization', `Bearer ${token}`)
            .send({ user_id: 1, status: 'active' });
        expect(res.status).toBe(200);
    });
    it('GET /orders should list orders', async () => {
        const res = await request
            .get('/orders')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    it('GET /orders/:id should return an order', async () => {
        const res = await request
            .get('/orders/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    it('PUT /orders/:id should update an order', async () => {
        const res = await request
            .put('/orders/1')
            .set('Authorization', `Bearer ${token}`)
            .send({ status: 'complete' });
        expect(res.status).toBe(200);
    });
    it('DELETE /orders/:id should delete an order', async () => {
        const res = await request
            .delete('/orders/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
});
//# sourceMappingURL=orderRoutesSpec.js.map