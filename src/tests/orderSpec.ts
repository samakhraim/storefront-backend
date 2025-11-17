import supertest from 'supertest'
import app from '../server'
import jwt from 'jsonwebtoken'
import { UserStore } from '../models/user'
import client from '../database'

const request = supertest(app)
const store = new UserStore()
let token: string
let userId: number
let orderId: number

describe('Order Endpoints', () => {
  beforeAll(async () => {
    const conn = await client.connect()
    await conn.query('TRUNCATE order_products, orders, products, users RESTART IDENTITY CASCADE')
    conn.release()

    const uniqueEmail = `orders_${Date.now()}@example.com`
    const user = await store.create({
      first_name: 'OrderUser',
      last_name: 'Test',
      email: uniqueEmail,
      password: '123'
    })
    userId = user.id!
    token = jwt.sign({ user }, process.env.TOKEN_SECRET!)
  })

  it('POST /orders should create an order', async () => {
    const res = await request
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ user_id: userId, status: 'active' })
    expect(res.status).toBe(200)
    orderId = res.body.id
  })

  it('GET /orders should list all orders', async () => {
    const res = await request.get('/orders').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('GET /orders/:id should return one order', async () => {
    const res = await request.get(`/orders/${orderId}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(orderId)
  })

  it('PUT /orders/:id should update order status', async () => {
    const res = await request
      .put(`/orders/${orderId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'complete' })
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('complete')
  })

  it('DELETE /orders/:id should delete an order', async () => {
    const res = await request.delete(`/orders/${orderId}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })
})
