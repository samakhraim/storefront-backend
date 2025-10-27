import client from '../database'

export type OrderProduct = {
  id?: number
  order_id: number
  product_id: number
  quantity: number
}

export class OrderProductStore {
  // Add product to an order
  async addProduct(op: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await client.connect()
      const result = await conn.query(
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [op.order_id, op.product_id, op.quantity]
      )
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Cannot add product ${op.product_id} to order ${op.order_id}: ${err}`)
    }
  }

  // Get all products for a given order
  async productsByOrder(orderId: string): Promise<OrderProduct[]> {
    try {
      const conn = await client.connect()
      const result = await conn.query(
        'SELECT * FROM order_products WHERE order_id=$1',
        [orderId]
      )
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot get products for order ${orderId}: ${err}`)
    }
  }
}
