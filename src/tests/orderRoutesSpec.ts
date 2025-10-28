import supertest from 'supertest'
import app from '../server'
import jwt from 'jsonwebtoken'
import { UserStore } from '../models/user'

const request = supertest(app)
const store = new UserStore()
let token: string

describe('Order Endpoints', () => {
  beforeAll(async () => {
    const user = await store.create({
      first_name: 'OrderTester',
      last_name: 'User',
      password: '123'
    })
    token = jwt.sign({ user }, process.env.TOKEN_SECRET!)
  })

  it('POST /orders should create an order', async () => {
    const res = await request
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ user_id: 1, status: 'active' })
    expect(res.status).toBe(200)
  })

  it('GET /orders should list orders', async () => {
    const res = await request
      .get('/orders')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })

  it('GET /orders/:id should return an order', async () => {
    const res = await request
      .get('/orders/1')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })

  it('PUT /orders/:id should update an order', async () => {
    const res = await request
      .put('/orders/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'complete' })
    expect(res.status).toBe(200)
  })

  it('DELETE /orders/:id should delete an order', async () => {
    const res = await request
      .delete('/orders/1')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })
})
