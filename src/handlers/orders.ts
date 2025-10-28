import express, { Request, Response } from 'express'
import { OrderStore } from '../models/order'
import { verifyAuthToken } from '../middleware/auth'

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index()
    res.json(orders)
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id!)
    res.json(order)
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const newOrder = await store.create(req.body)
    res.json(newOrder)
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const updatedOrder = await store.update(req.params.id!, req.body.status)
    res.json(updatedOrder)
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id!)
    res.json(deleted)
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
}

const ordersRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index)
  app.get('/orders/:id', verifyAuthToken, show)
  app.post('/orders', verifyAuthToken, create)
  app.put('/orders/:id', verifyAuthToken, update)
  app.delete('/orders/:id', verifyAuthToken, destroy)
}

export default ordersRoutes
