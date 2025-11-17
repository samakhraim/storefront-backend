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
describe('OrderProduct Endpoints', () => {
    beforeAll(async () => {
        const user = await userStore.create({
            first_name: 'OrderProd',
            last_name: 'User',
            email: 'orderprod@example.com',
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