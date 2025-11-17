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

describe('OrderProduct Endpoints', () => {
  beforeAll(async () => {
    const conn = await client.connect()
    await conn.query('TRUNCATE order_products, orders, products, users RESTART IDENTITY CASCADE')
    conn.release()

    const uniqueEmail = `orderprod_${Date.now()}@example.com`
    const user = await store.create({
      first_name: 'OrderProd',
      last_name: 'User',
      email: uniqueEmail,
      password: '123'
    })
    userId = user.id!
    token = jwt.sign({ user }, process.env.TOKEN_SECRET!)
  })

  it('should create a user successfully', async () => {
    expect(userId).toBeDefined()
    expect(token).toBeDefined()
  })

  // Add more tests if you have order_products routes implemented
})
