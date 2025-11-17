"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
class UserStore {
    async index() {
        const conn = await database_1.default.connect();
        const result = await conn.query('SELECT id, first_name, last_name, email FROM users');
        conn.release();
        return result.rows;
    }
    async show(id) {
        const conn = await database_1.default.connect();
        const result = await conn.query('SELECT id, first_name, last_name, email FROM users WHERE id=$1', [id]);
        conn.release();
        return result.rows[0];
    }
    async create(u) {
        const conn = await database_1.default.connect();
        const hash = bcrypt_1.default.hashSync(u.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
        const result = await conn.query('INSERT INTO users (first_name, last_name, email, password_digest) VALUES ($1,$2,$3,$4) RETURNING id, first_name, last_name, email', [u.first_name, u.last_name, u.email, hash]);
        conn.release();
        return result.rows[0];
    }
    async update(id, u) {
        const conn = await database_1.default.connect();
        const hash = bcrypt_1.default.hashSync(u.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
        const result = await conn.query('UPDATE users SET first_name=$1, last_name=$2, email=$3, password_digest=$4 WHERE id=$5 RETURNING id, first_name, last_name, email', [u.first_name, u.last_name, u.email, hash, id]);
        conn.release();
        return result.rows[0];
    }
    async delete(id) {
        const conn = await database_1.default.connect();
        const result = await conn.query('DELETE FROM users WHERE id=$1 RETURNING id, first_name, last_name, email', [id]);
        conn.release();
        return result.rows[0];
    }
    async authenticate(email, password) {
        const conn = await database_1.default.connect();
        const result = await conn.query('SELECT * FROM users WHERE email=$1', [email]);
        conn.release();
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, user.password_digest)) {
                return {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    password: ''
                };
            }
        }
        return null;
    }
}
exports.UserStore = UserStore;
//# sourceMappingURL=user.js.map