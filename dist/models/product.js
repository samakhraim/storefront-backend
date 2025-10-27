"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        const conn = await database_1.default.connect();
        const result = await conn.query('SELECT * FROM products');
        conn.release();
        return result.rows;
    }
    async show(id) {
        const conn = await database_1.default.connect();
        const result = await conn.query('SELECT * FROM products WHERE id = $1', [id]);
        conn.release();
        return result.rows[0];
    }
    async create(p) {
        const conn = await database_1.default.connect();
        const result = await conn.query('INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *', [p.name, p.price]);
        conn.release();
        return result.rows[0];
    }
    async update(id, p) {
        const conn = await database_1.default.connect();
        const result = await conn.query('UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *', [p.name, p.price, id]);
        conn.release();
        return result.rows[0];
    }
    async delete(id) {
        const conn = await database_1.default.connect();
        const result = await conn.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        conn.release();
        return result.rows[0];
    }
}
exports.ProductStore = ProductStore;
//# sourceMappingURL=product.js.map