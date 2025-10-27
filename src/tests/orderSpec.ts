import { OrderStore } from '../models/order'
import { UserStore } from '../models/user'

const orderStore = new OrderStore()
const userStore = new UserStore()

describe('Order Model', () => {
  let userId: number
  let orderId: number

  beforeAll(async () => {
    // Create a test user so we can attach an order to it
    const user = await userStore.create({
      first_name: 'TestUser',
      last_name: 'ForOrder',
      password: 'test123'
    })
    userId = user.id as number
  })

  it('should create a new order', async () => {
    const result = await orderStore.create({
      user_id: userId,
      status: 'active'
    })
    orderId = result.id as number
    expect(result.status).toEqual('active')
    expect(result.user_id).toEqual(userId)
  })

  it('should return a list of orders', async () => {
    const result = await orderStore.index()
    expect(result.length).toBeGreaterThan(0)
  })

  it('should return the correct order by id', async () => {
    const result = await orderStore.show(orderId.toString())
    expect(result.id).toEqual(orderId)
    expect(result.user_id).toEqual(userId)
  })

  it('should update an order status', async () => {
    const result = await orderStore.update(orderId.toString(), 'complete')
    expect(result.status).toEqual('complete')
  })

  it('should delete the order', async () => {
    const result = await orderStore.delete(orderId.toString())
    expect(result.id).toEqual(orderId)
  })
})
