import express, { Request, Response } from 'express';
import { OrderStore } from '../models/order';

const store = new OrderStore();

const create = async (req: Request, res: Response) => {
  try {
    const {
      full_name,
      email,
      phone,
      shipping_address,
      city,
      country,
      postal_code,
      payment_method,
      total_price,
      products
    } = req.body;

    const order_id = await store.create({
      full_name,
      email,
      phone,
      shipping_address,
      city,
      country,
      postal_code,
      payment_method,
      total_price,
      products
    });

    res.json({ success: true, order_id });

  } catch (err) {
    console.error('❌ Order creation failed:', err);
    res.status(500).json({ error: 'Order creation failed' });
  }
};

const ordersRoutes = (app: express.Application) => {
  app.post('/orders', create);
};

export default ordersRoutes;
