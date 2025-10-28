import express, { Request, Response } from 'express'
import { ProductStore } from '../models/product'
import { verifyAuthToken } from '../middleware/auth'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index()
    res.json(products)
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id!)
    res.json(product)
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const product = await store.create(req.body)
    res.json(product)
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const product = await store.update(req.params.id!, req.body)
    res.json(product)
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
    const product = await store.delete(req.params.id!)
    res.json(product)
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
}

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', verifyAuthToken, create)
  app.put('/products/:id', verifyAuthToken, update)
  app.delete('/products/:id', verifyAuthToken, destroy)
}

export default productRoutes
