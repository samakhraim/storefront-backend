import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../database';

const pepper = process.env.BCRYPT_PASSWORD || '';
const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');
const tokenSecret = process.env.TOKEN_SECRET || 'mysecret';

const authRoutes = (app: express.Application) => {
  
  // SIGNUP
  app.post('/signup', async (req: Request, res: Response) => {
    try {
      const { first_name, last_name, email, password } = req.body;

      const hash = await bcrypt.hash(password + pepper, saltRounds);

      const sql = `
        INSERT INTO users (first_name, last_name, email, password_digest)
        VALUES ($1, $2, $3, $4)
        RETURNING id, first_name, last_name, email;
      `;

      const conn = await client.connect();
      const result = await conn.query(sql, [
        first_name,
        last_name,
        email,
        hash
      ]);
      conn.release();

      const token = jwt.sign(result.rows[0], tokenSecret);

      res.json({ token, user: result.rows[0] });

    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Signup failed' });
    }
  });

  // LOGIN
  app.post('/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const conn = await client.connect();
      const userResult = await conn.query(`SELECT * FROM users WHERE email=$1`, [
        email
      ]);
      conn.release();

      const user = userResult.rows[0];
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });

      const valid = await bcrypt.compare(password + pepper, user.password_digest);
      if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

      delete user.password_digest;

      const token = jwt.sign(user, tokenSecret);

      res.json({ token, user });

    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Login failed' });
    }
  });

};

export default authRoutes;
