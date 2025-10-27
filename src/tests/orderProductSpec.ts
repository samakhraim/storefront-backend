import { OrderProductStore } from '../models/orderProduct'
import { OrderStore } from '../models/order'
import { ProductStore } from '../models/product'
import { UserStore } from '../models/user'

const orderProductStore = new OrderProductStore()
const orderStore = new OrderStore()
const productStore = new ProductStore()
const userStore = new UserStore()

describe('OrderProduct Model', () => {
  let userId: number
  let orderId: number
  let productId: number

  beforeAll(async () => {
    const user = await userStore.create({
      first_name: 'OrderProd',
      last_name: 'User',
      password: '123'
    })
    userId = user.id!

    const order = await orderStore.create({
      user_id: userId,
      status: 'active'
    })
    orderId = order.id!

    const product = await productStore.create({
      name: 'TestProduct',
      price: 50
    })
    productId = product.id!
  })

  it('should add a product to an order', async () => {
    const result = await orderProductStore.addProduct({
      order_id: orderId,
      product_id: productId,
      quantity: 3
    })
    expect(result.quantity).toEqual(3)
    expect(result.order_id).toEqual(orderId)
  })

  it('should list products in an order', async () => {
    const result = await orderProductStore.productsByOrder(orderId.toString())
    const [firstItem] = result
    expect(result.length).toBeGreaterThan(0)
    expect(firstItem?.order_id).toEqual(orderId)
  })
})
