import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    const conn = await client.connect();
    const result = await conn.query(
      'SELECT id, first_name, last_name, email FROM users'
    );
    conn.release();
    return result.rows;
  }

  async show(id: string): Promise<User> {
    const conn = await client.connect();
    const result = await conn.query(
      'SELECT id, first_name, last_name, email FROM users WHERE id=$1', 
      [id]
    );
    conn.release();
    return result.rows[0];
  }

  async create(u: User): Promise<User> {
    const conn = await client.connect();

    const hash = bcrypt.hashSync(
      u.password + BCRYPT_PASSWORD,
      parseInt(SALT_ROUNDS as string)
    );

    const result = await conn.query(
      `INSERT INTO users (first_name, last_name, email, password_digest)
       VALUES ($1, $2, $3, $4)
       RETURNING id, first_name, last_name, email`,
      [u.first_name, u.last_name, u.email, hash]
    );

    conn.release();
    return result.rows[0];
  }

  async update(id: string, u: User): Promise<User> {
    const conn = await client.connect();

    const hash = bcrypt.hashSync(
      u.password + BCRYPT_PASSWORD,
      parseInt(SALT_ROUNDS as string)
    );

    const result = await conn.query(
      `UPDATE users SET first_name=$1, last_name=$2, email=$3, password_digest=$4 
       WHERE id=$5 
       RETURNING id, first_name, last_name, email`,
      [u.first_name, u.last_name, u.email, hash, id]
    );

    conn.release();
    return result.rows[0];
  }

  async delete(id: string): Promise<User> {
    const conn = await client.connect();
    const result = await conn.query(
      `DELETE FROM users WHERE id=$1 
       RETURNING id, first_name, last_name, email`,
      [id]
    );
    conn.release();
    return result.rows[0];
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    const conn = await client.connect();
    const result = await conn.query(
      'SELECT * FROM users WHERE email=$1',
      [email]
    );
    conn.release();

    if (result.rows.length === 0) return null;

    const user = result.rows[0];

    const validPassword = bcrypt.compareSync(
      password + BCRYPT_PASSWORD,
      user.password_digest
    );

    if (!validPassword) return null;

    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: ''
    };
  }
}
