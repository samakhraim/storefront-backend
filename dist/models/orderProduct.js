"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderProductStore {
    async addProduct(op) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query('INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [op.order_id, op.product_id, op.quantity]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot add product ${op.product_id} to order ${op.order_id}: ${err}`);
        }
    }
    async productsByOrder(orderId) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query('SELECT * FROM order_products WHERE order_id=$1', [orderId]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get products for order ${orderId}: ${err}`);
        }
    }
}
exports.OrderProductStore = OrderProductStore;
//# sourceMappingURL=orderProduct.js.map