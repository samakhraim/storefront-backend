"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
const create = async (req, res) => {
    try {
        const { full_name, email, phone, shipping_address, city, country, postal_code, payment_method, total_price, products } = req.body;
        const order_id = await store.create({
            full_name,
            email,
            phone,
            shipping_address,
            city,
            country,
            postal_code,
            payment_method,
            total_price,
            products
        });
        res.json({ success: true, order_id });
    }
    catch (err) {
        console.error('❌ Order creation failed:', err);
        res.status(500).json({ error: 'Order creation failed' });
    }
};
const ordersRoutes = (app) => {
    app.post('/orders', create);
};
exports.default = ordersRoutes;
//# sourceMappingURL=orders.js.map