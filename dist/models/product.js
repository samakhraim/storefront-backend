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
        const result = await conn.query('SELECT * FROM products ORDER BY id ASC');
        conn.release();
        return result.rows;
    }
    async show(id) {
        const conn = await database_1.default.connect();
        const result = await conn.query('SELECT * FROM products WHERE id=$1', [id]);
        conn.release();
        return result.rows[0];
    }
    async create(p) {
        const conn = await database_1.default.connect();
        const result = await conn.query('INSERT INTO products (name, description, price, image_url) VALUES ($1,$2,$3,$4) RETURNING *', [p.name, p.description, p.price, p.image_url]);
        conn.release();
        return result.rows[0];
    }
    async update(id, p) {
        const conn = await database_1.default.connect();
        const result = await conn.query('UPDATE products SET name=$1, description=$2, price=$3, image_url=$4 WHERE id=$5 RETURNING *', [p.name, p.description, p.price, p.image_url, id]);
        conn.release();
        return result.rows[0];
    }
    async delete(id) {
        const conn = await database_1.default.connect();
        const result = await conn.query('DELETE FROM products WHERE id=$1 RETURNING *', [id]);
        conn.release();
        return result.rows[0];
    }
}
exports.ProductStore = ProductStore;
//# sourceMappingURL=product.js.map