import supertest from 'supertest'
import app from '../server'
import jwt from 'jsonwebtoken'
import { UserStore } from '../models/user'

const request = supertest(app)
const store = new UserStore()

let token: string

describe('Product Endpoints', () => {
  beforeAll(async () => {
    const user = await store.create({
      first_name: 'ProdTester',
      last_name: 'User',
      password: '123'
    })
    token = jwt.sign({ user }, process.env.TOKEN_SECRET!)
  })

  it('POST /products should create a product', async () => {
    const res = await request
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Phone', price: 999 })
    expect(res.status).toBe(200)
  })

  it('GET /products should list products', async () => {
    const res = await request.get('/products')
    expect(res.status).toBe(200)
  })

  it('GET /products/:id should return a product', async () => {
    const res = await request.get('/products/1')
    expect(res.status).toBe(200)
  })

  it('PUT /products/:id should update a product', async () => {
    const res = await request
      .put('/products/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Phone', price: 899 })
    expect(res.status).toBe(200)
  })

  it('DELETE /products/:id should delete a product', async () => {
    const res = await request
      .delete('/products/1')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })
})
