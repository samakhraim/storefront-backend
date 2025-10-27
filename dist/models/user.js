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
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query('SELECT id, first_name, last_name FROM users');
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Unable to get users: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query('SELECT id, first_name, last_name FROM users WHERE id=($1)', [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to find user ${id}: ${err}`);
        }
    }
    async create(u) {
        try {
            const conn = await database_1.default.connect();
            const hash = bcrypt_1.default.hashSync(u.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
            const result = await conn.query('INSERT INTO users (first_name, last_name, password_digest) VALUES($1, $2, $3) RETURNING id, first_name, last_name', [u.first_name, u.last_name, hash]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to create user (${u.first_name} ${u.last_name}): ${err}`);
        }
    }
    async update(id, u) {
        try {
            const conn = await database_1.default.connect();
            const hash = bcrypt_1.default.hashSync(u.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
            const result = await conn.query('UPDATE users SET first_name=$1, last_name=$2, password_digest=$3 WHERE id=$4 RETURNING id, first_name, last_name', [u.first_name, u.last_name, hash, id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to update user ${id}: ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query('DELETE FROM users WHERE id=$1 RETURNING id, first_name, last_name', [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to delete user ${id}: ${err}`);
        }
    }
    async authenticate(first_name, password) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query('SELECT * FROM users WHERE first_name=$1', [first_name]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, user.password_digest)) {
                    conn.release();
                    return { id: user.id, first_name: user.first_name, last_name: user.last_name, password: '' };
                }
            }
            conn.release();
            return null;
        }
        catch (err) {
            throw new Error(`Authentication failed: ${err}`);
        }
    }
}
exports.UserStore = UserStore;
//# sourceMappingURL=user.js.map