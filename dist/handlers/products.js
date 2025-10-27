"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const auth_1 = require("../middleware/auth");
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const product = await store.show(req.params.id);
    res.json(product);
};
const create = async (req, res) => {
    const product = await store.create(req.body);
    res.json(product);
};
const update = async (req, res) => {
    const product = await store.update(req.params.id, req.body);
    res.json(product);
};
const destroy = async (req, res) => {
    const product = await store.delete(req.params.id);
    res.json(product);
};
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', auth_1.verifyAuthToken, create);
    app.put('/products/:id', auth_1.verifyAuthToken, update);
    app.delete('/products/:id', auth_1.verifyAuthToken, destroy);
};
exports.default = productRoutes;
//# sourceMappingURL=products.js.map