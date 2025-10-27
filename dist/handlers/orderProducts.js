"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderProduct_1 = require("../models/orderProduct");
const auth_1 = require("../middleware/auth");
const store = new orderProduct_1.OrderProductStore();
const addProduct = async (req, res) => {
    const orderProduct = await store.addProduct(req.body);
    res.json(orderProduct);
};
const productsByOrder = async (req, res) => {
    const result = await store.productsByOrder(req.params.orderId);
    res.json(result);
};
const orderProductRoutes = (app) => {
    app.post('/orders/:orderId/products', auth_1.verifyAuthToken, addProduct);
    app.get('/orders/:orderId/products', auth_1.verifyAuthToken, productsByOrder);
};
exports.default = orderProductRoutes;
//# sourceMappingURL=orderProducts.js.map