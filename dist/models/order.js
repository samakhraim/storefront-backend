"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query('SELECT * FROM orders');
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get orders: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query('SELECT * FROM orders WHERE id=($1)', [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot find order ${id}: ${err}`);
        }
    }
    async create(o) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query('INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *', [o.user_id, o.status]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot create order: ${err}`);
        }
    }
    async update(id, status) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query('UPDATE orders SET status=$1 WHERE id=$2 RETURNING *', [status, id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot update order ${id}: ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query('DELETE FROM orders WHERE id=$1 RETURNING *', [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot delete order ${id}: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
//# sourceMappingURL=order.js.map