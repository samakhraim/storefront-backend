import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import client from '../database';

const router = express.Router();
const SECRET = process.env.TOKEN_SECRET as string;

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const conn = await client.connect();

    const { first_name, last_name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (first_name, last_name, email, password_digest)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email;
    `;

    const result = await conn.query(sql, [first_name, last_name, email, hash]);
    conn.release();

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ error: 'Signup error' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const conn = await client.connect();

    const { email, password } = req.body;

    const sql = `SELECT * FROM users WHERE email = $1`;
    const result = await conn.query(sql, [email]);
    conn.release();

    if (result.rows.length === 0) return res.status(400).json({ error: 'User not found' });

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password_digest);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, SECRET);

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: 'Login error' });
  }
});

export default router;
