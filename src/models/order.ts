import client from '../database'

export type Order = {
  id?: number
  user_id: number
  status?: string
  total_price?: number
  full_name?: string
  email?: string
  phone?: string
  shipping_address?: string
  city?: string
  country?: string
  postal_code?: string
  payment_method?: string
}

export class OrderStore {
  async index(): Promise<Order[]> {
    const conn = await client.connect()
    const result = await conn.query('SELECT * FROM orders ORDER BY id ASC')
    conn.release()
    return result.rows
  }

  async show(id: string): Promise<Order> {
    const conn = await client.connect()
    const result = await conn.query('SELECT * FROM orders WHERE id=$1', [id])
    conn.release()
    return result.rows[0]
  }

  async create(o: Order): Promise<Order> {
    const conn = await client.connect()
    const result = await conn.query(
      `INSERT INTO orders 
      (user_id, status, total_price, full_name, email, phone, shipping_address, city, country, postal_code, payment_method)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *`,
      [
        o.user_id,
        o.status || 'pending',
        o.total_price || 0,
        o.full_name,
        o.email,
        o.phone,
        o.shipping_address,
        o.city,
        o.country,
        o.postal_code,
        o.payment_method
      ]
    )
    conn.release()
    return result.rows[0]
  }

  async update(id: string, status: string): Promise<Order> {
    const conn = await client.connect()
    const result = await conn.query(
      'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *',
      [status, id]
    )
    conn.release()
    return result.rows[0]
  }

  async delete(id: string): Promise<Order> {
    const conn = await client.connect()
    const result = await conn.query('DELETE FROM orders WHERE id=$1 RETURNING *', [id])
    conn.release()
    return result.rows[0]
  }
}
