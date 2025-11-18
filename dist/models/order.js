"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async create(o) {
        try {
            const conn = await database_1.default.connect();
            const sqlOrder = `
        INSERT INTO orders (
          full_name,
          email,
          phone,
          shipping_address,
          city,
          country,
          postal_code,
          payment_method,
          total_price
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING id;
      `;
            const orderResult = await conn.query(sqlOrder, [
                o.full_name,
                o.email,
                o.phone || null,
                o.shipping_address,
                o.city || null,
                o.country || null,
                o.postal_code || null,
                o.payment_method,
                o.total_price
            ]);
            const order_id = orderResult.rows[0].id;
            const sqlProduct = `
        INSERT INTO order_products (order_id, product_id, quantity)
        VALUES ($1,$2,$3)
      `;
            for (const p of o.products) {
                await conn.query(sqlProduct, [order_id, p.product_id, p.quantity]);
            }
            conn.release();
            return order_id;
        }
        catch (err) {
            throw new Error(`❌ Error creating order: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
//# sourceMappingURL=order.js.map