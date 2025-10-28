"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const auth_1 = require("../middleware/auth");
const store = new order_1.OrderStore();
const index = async (_req, res) => {
    try {
        const orders = await store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const show = async (req, res) => {
    try {
        const order = await store.show(req.params.id);
        res.json(order);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const create = async (req, res) => {
    try {
        const newOrder = await store.create(req.body);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const update = async (req, res) => {
    try {
        const updatedOrder = await store.update(req.params.id, req.body.status);
        res.json(updatedOrder);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const destroy = async (req, res) => {
    try {
        const deleted = await store.delete(req.params.id);
        res.json(deleted);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const ordersRoutes = (app) => {
    app.get('/orders', auth_1.verifyAuthToken, index);
    app.get('/orders/:id', auth_1.verifyAuthToken, show);
    app.post('/orders', auth_1.verifyAuthToken, create);
    app.put('/orders/:id', auth_1.verifyAuthToken, update);
    app.delete('/orders/:id', auth_1.verifyAuthToken, destroy);
};
exports.default = ordersRoutes;
//# sourceMappingURL=orders.js.map