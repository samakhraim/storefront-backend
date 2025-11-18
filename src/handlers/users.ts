import express, { Request, Response } from 'express';
import { UserStore } from '../models/user';
import { verifyAuthToken } from '../middleware/auth';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id!);
  res.json(user);
};

const update = async (req: Request, res: Response) => {
  const user = await store.update(req.params.id!, req.body);
  res.json(user);
};

const destroy = async (req: Request, res: Response) => {
  const user = await store.delete(req.params.id!);
  res.json(user);
};

const usersRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.put('/users/:id', verifyAuthToken, update);
  app.delete('/users/:id', verifyAuthToken, destroy);
};

export default usersRoutes;
