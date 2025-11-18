"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const database_1 = __importDefault(require("../database"));
const request = (0, supertest_1.default)(server_1.default);
describe('User Endpoints', () => {
    let token;
    let userId;
    beforeAll(async () => {
        const conn = await database_1.default.connect();
        await conn.query('TRUNCATE order_products, orders, products, users RESTART IDENTITY CASCADE');
        conn.release();
    });
    it('POST /users should create a user', async () => {
        const res = await request.post('/users').send({
            first_name: 'Sam',
            last_name: 'Tester',
            email: `sam_${Date.now()}@test.com`,
            password: '123'
        });
        expect(res.status).toBe(200);
        token = res.body.token;
        userId = res.body.user.id;
        expect(token).toBeDefined();
        expect(userId).toBeDefined();
    });
    it('POST /users/authenticate should return a token', async () => {
        const res = await request.post('/users/authenticate').send({
            email: `sam_${Date.now()}@test.com`,
            password: '123'
        });
        expect([200, 401]).toContain(res.status);
    });
    it('GET /users should list users', async () => {
        const res = await request.get('/users').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBeTrue();
    });
    it('GET /users/:id should return a user', async () => {
        const res = await request.get(`/users/${userId}`).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(userId);
    });
    it('PUT /users/:id should update user info', async () => {
        const res = await request.put(`/users/${userId}`).set('Authorization', `Bearer ${token}`).send({
            first_name: 'SamUpdated',
            last_name: 'Tester',
            email: `samupdated_${Date.now()}@test.com`,
            password: '456'
        });
        expect(res.status).toBe(200);
        expect(res.body.first_name).toBe('SamUpdated');
    });
    it('DELETE /users/:id should delete the user', async () => {
        const res = await request.delete(`/users/${userId}`).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
});
//# sourceMappingURL=userRoutesSpec.js.map