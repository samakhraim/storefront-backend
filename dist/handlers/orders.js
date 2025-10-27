"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const auth_1 = require("../middleware/auth");
const store = new order_1.OrderStore();
const index = async (_req, res) => {
    const orders = await store.index();
    res.json(orders);
};
const show = async (req, res) => {
    const order = await store.show(req.params.id);
    res.json(order);
};
const create = async (req, res) => {
    const newOrder = await store.create(req.body);
    res.json(newOrder);
};
const update = async (req, res) => {
    const updatedOrder = await store.update(req.params.id, req.body.status);
    res.json(updatedOrder);
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
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