import express, { Request, Response } from 'express'
import { OrderProductStore } from '../models/orderProduct'
import { verifyAuthToken } from '../middleware/auth'

const store = new OrderProductStore()

const addProduct = async (req: Request, res: Response) => {
  const orderProduct = await store.addProduct(req.body)
  res.json(orderProduct)
}

const productsByOrder = async (req: Request, res: Response) => {
  const result = await store.productsByOrder(req.params.orderId!)
  res.json(result)
}

const orderProductRoutes = (app: express.Application) => {
  app.post('/orders/:orderId/products', verifyAuthToken, addProduct)
  app.get('/orders/:orderId/products', verifyAuthToken, productsByOrder)
}

export default orderProductRoutes
