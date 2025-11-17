import supertest from 'supertest'
import app from '../server'
import jwt from 'jsonwebtoken'
import { UserStore } from '../models/user'

const request = supertest(app)
const userStore = new UserStore()

let token: string

describe('Product Endpoints', () => {
  beforeAll(async () => {
    const user = await userStore.create({
      first_name: 'ProdTester',
      last_name: 'User',
      password: '123'
    })
    token = jwt.sign({ user }, process.env.TOKEN_SECRET!)
  })

  it('POST /products should create multiple products', async () => {
    const products = [
      { name: 'Book', price: 15 },
      { name: 'Phone', price: 999 },
      { name: 'Laptop', price: 1999 },
      { name: 'Smartwatch', price: 299 },
      { name: 'Camera', price: 850 },
      { name: 'Tablet', price: 450 },
      { name: 'Headphones', price: 120 },
      { name: 'Keyboard', price: 180 },
      { name: 'Monitor', price: 600 },
      { name: 'Gaming Chair', price: 400 }
    ]

    for (const product of products) {
      const res = await request
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send(product)

      expect(res.status).toBe(200)
      expect(res.body.name).toBe(product.name)
      expect(res.body.price).toBe(product.price)
      expect(res.body.id).toBeDefined()
      console.log(`✅ Added: ${product.name}`)
    }
  })

  it('GET /products should list all products', async () => {
    const res = await request.get('/products')
    expect(res.status).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('GET /products/:id should return a product', async () => {
    const listRes = await request.get('/products')
    expect(listRes.status).toBe(200)
    expect(listRes.body.length).toBeGreaterThan(0)

    const firstId = listRes.body[0].id
    const res = await request.get(`/products/${firstId}`)
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(firstId)
  })

  it('PUT /products/:id should update a product', async () => {
    const listRes = await request.get('/products')
    const firstId = listRes.body[0].id

    const res = await request
      .put(`/products/${firstId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Product', price: 500 })

    expect(res.status).toBe(200)
    expect(res.body.name).toBe('Updated Product')
    expect(res.body.price).toBe(500)
  })

  it('DELETE /products/:id should delete a product', async () => {
    const newProd = await request
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Temp Item', price: 50 })

    const id = newProd.body.id
    const res = await request
      .delete(`/products/${id}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })
})
