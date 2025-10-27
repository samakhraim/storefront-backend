"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const auth_1 = require("../middleware/auth");
const store = new user_1.UserStore();
const index = async (_req, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const show = async (req, res) => {
    try {
        const user = await store.show(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const create = async (req, res) => {
    try {
        const user = await store.create(req.body);
        const token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
        res.json({ token, user });
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const update = async (req, res) => {
    try {
        const user = await store.update(req.params.id, req.body);
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const user = await store.delete(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const authenticate = async (req, res) => {
    try {
        const { first_name, password } = req.body;
        const user = await store.authenticate(first_name, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
        res.json({ token, user });
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const usersRoutes = (app) => {
    app.get('/users', auth_1.verifyAuthToken, index);
    app.get('/users/:id', auth_1.verifyAuthToken, show);
    app.post('/users', create);
    app.put('/users/:id', auth_1.verifyAuthToken, update);
    app.delete('/users/:id', auth_1.verifyAuthToken, destroy);
    app.post('/users/authenticate', authenticate);
};
exports.default = usersRoutes;
//# sourceMappingURL=users.js.map