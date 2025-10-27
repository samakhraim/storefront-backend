import express, { Request, Response } from 'express'
import { ProductStore } from '../models/product'
import { verifyAuthToken } from '../middleware/auth'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
  const products = await store.index()
  res.json(products)
}

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id)
  res.json(product)
}

const create = async (req: Request, res: Response) => {
  const product = await store.create(req.body)
  res.json(product)
}

const update = async (req: Request, res: Response) => {
  const product = await store.update(req.params.id, req.body)
  res.json(product)
}

const destroy = async (req: Request, res: Response) => {
  const product = await store.delete(req.params.id)
  res.json(product)
}

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', verifyAuthToken, create)
  app.put('/products/:id', verifyAuthToken, update)
  app.delete('/products/:id', verifyAuthToken, destroy)
}

export default productRoutes
