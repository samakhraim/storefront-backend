"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const database_1 = __importDefault(require("../database"));
const request = (0, supertest_1.default)(server_1.default);
const store = new user_1.UserStore();
let token;
let userId;
let orderId;
describe('OrderProduct Endpoints', () => {
    beforeAll(async () => {
        const conn = await database_1.default.connect();
        await conn.query('TRUNCATE order_products, orders, products, users RESTART IDENTITY CASCADE');
        conn.release();
        const uniqueEmail = `orderprod_${Date.now()}@example.com`;
        const user = await store.create({
            first_name: 'OrderProd',
            last_name: 'User',
            email: uniqueEmail,
            password: '123'
        });
        userId = user.id;
        token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
    });
    it('should create a user successfully', async () => {
        expect(userId).toBeDefined();
        expect(token).toBeDefined();
    });
});
//# sourceMappingURL=orderProductSpec.js.map