import express from 'express';
import jwt from 'jsonwebtoken';
import { UserStore } from '../models/user';

const router = express.Router();
const store = new UserStore();

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const user = await store.create(req.body);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.TOKEN_SECRET!
    );

    return res.json({ user, token });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: 'Signup failed' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await store.authenticate(email, password);

    if (!user)
      return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.TOKEN_SECRET!
    );

    return res.json({ user, token });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: 'Login failed' });
  }
});

export default router;
