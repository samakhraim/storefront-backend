import client from '../database'

export type Product = {
  id?: number
  name: string
  price: number
}

export class ProductStore {
  async index(): Promise<Product[]> {
    const conn = await client.connect()
    const result = await conn.query('SELECT * FROM products')
    conn.release()
    return result.rows
  }

  async show(id: string): Promise<Product> {
    const conn = await client.connect()
    const result = await conn.query('SELECT * FROM products WHERE id = $1', [id])
    conn.release()
    return result.rows[0]
  }

  async create(p: Product): Promise<Product> {
    const conn = await client.connect()
    const result = await conn.query(
      'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
      [p.name, p.price]
    )
    conn.release()
    return result.rows[0]
  }

  async update(id: string, p: Product): Promise<Product> {
    const conn = await client.connect()
    const result = await conn.query(
      'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
      [p.name, p.price, id]
    )
    conn.release()
    return result.rows[0]
  }

  async delete(id: string): Promise<Product> {
    const conn = await client.connect()
    const result = await conn.query('DELETE FROM products WHERE id = $1 RETURNING *', [id])
    conn.release()
    return result.rows[0]
  }
}
