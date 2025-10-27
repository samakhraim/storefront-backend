import client from '../database'

export type Order = {
  id?: number
  user_id: number
  status: string
}

export class OrderStore {
  //  Get all orders
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect()
      const result = await conn.query('SELECT * FROM orders')
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot get orders: ${err}`)
    }
  }

  //  Get order by id
  async show(id: string): Promise<Order> {
    try {
      const conn = await client.connect()
      const result = await conn.query('SELECT * FROM orders WHERE id=($1)', [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Cannot find order ${id}: ${err}`)
    }
  }

  //  Create new order
  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect()
      const result = await conn.query(
        'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *',
        [o.user_id, o.status]
      )
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Cannot create order: ${err}`)
    }
  }

  //  Update order
  async update(id: string, status: string): Promise<Order> {
    try {
      const conn = await client.connect()
      const result = await conn.query(
        'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *',
        [status, id]
      )
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Cannot update order ${id}: ${err}`)
    }
  }

  //  Delete order
  async delete(id: string): Promise<Order> {
    try {
      const conn = await client.connect()
      const result = await conn.query('DELETE FROM orders WHERE id=$1 RETURNING *', [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Cannot delete order ${id}: ${err}`)
    }
  }
}
