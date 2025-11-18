"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const auth_1 = require("../middleware/auth");
const store = new user_1.UserStore();
const index = async (_req, res) => {
    const users = await store.index();
    res.json(users);
};
const show = async (req, res) => {
    const user = await store.show(req.params.id);
    res.json(user);
};
const update = async (req, res) => {
    const user = await store.update(req.params.id, req.body);
    res.json(user);
};
const destroy = async (req, res) => {
    const user = await store.delete(req.params.id);
    res.json(user);
};
const usersRoutes = (app) => {
    app.get('/users', auth_1.verifyAuthToken, index);
    app.get('/users/:id', auth_1.verifyAuthToken, show);
    app.put('/users/:id', auth_1.verifyAuthToken, update);
    app.delete('/users/:id', auth_1.verifyAuthToken, destroy);
};
exports.default = usersRoutes;
//# sourceMappingURL=users.js.map