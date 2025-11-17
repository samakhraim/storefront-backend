import supertest from 'supertest'
import app from '../server'
import jwt from 'jsonwebtoken'
import { UserStore } from '../models/user'
import client from '../database'

const request = supertest(app)
const userStore = new UserStore()
let token: string
let userId: number
let orderId: number

describe('Order Product Endpoints', () => {
  beforeAll(async () => {
    const conn = await client.connect()
    await conn.query('TRUNCATE order_products, orders, products, users RESTART IDENTITY CASCADE')
    conn.release()

    const user = await userStore.create({
      first_name: 'OrderTester',
      last_name: 'User',
      email: `order_${Date.now()}@test.com`,
      password: '123'
    })
    userId = user.id!
    token = jwt.sign({ user }, process.env.TOKEN_SECRET!)
  })

  it('POST /orders should create an order', async () => {
    const res = await request
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user_id: userId,
        status: 'pending',
        total_price: 250,
        full_name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        shipping_address: '123 Test St',
        city: 'Amman',
        country: 'Jordan',
        postal_code: '11118',
        payment_method: 'Credit Card'
      })
    expect(res.status).toBe(200)
    orderId = res.body.id
    expect(orderId).toBeDefined()
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
