import express, { Request, Response } from 'express'
import { OrderStore } from '../models/order'
import { verifyAuthToken } from '../middleware/auth'

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
  const orders = await store.index()
  res.json(orders)
}

const show = async (req: Request, res: Response) => {
const order = await store.show(req.params.id!)
  res.json(order)
}

const create = async (req: Request, res: Response) => {
  const newOrder = await store.create(req.body)
  res.json(newOrder)
}

const update = async (req: Request, res: Response) => {
const updatedOrder = await store.update(req.params.id!, req.body.status)
  res.json(updatedOrder)
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id!)
  res.json(deleted)
}

const ordersRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index)
  app.get('/orders/:id', verifyAuthToken, show)
  app.post('/orders', verifyAuthToken, create)
  app.put('/orders/:id', verifyAuthToken, update)
  app.delete('/orders/:id', verifyAuthToken, destroy)
}

export default ordersRoutes
