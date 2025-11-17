import client from '../database'

export type Product = {
  id?: number
  name: string
  description?: string
  price: number
  image_url?: string
}

export class ProductStore {
  async index(): Promise<Product[]> {
    const conn = await client.connect()
    const result = await conn.query('SELECT * FROM products ORDER BY id ASC')
    conn.release()
    return result.rows
  }

  async show(id: string): Promise<Product> {
    const conn = await client.connect()
    const result = await conn.query('SELECT * FROM products WHERE id=$1', [id])
    conn.release()
    return result.rows[0]
  }

  async create(p: Product): Promise<Product> {
    const conn = await client.connect()
    const result = await conn.query(
      'INSERT INTO products (name, description, price, image_url) VALUES ($1,$2,$3,$4) RETURNING *',
      [p.name, p.description, p.price, p.image_url]
    )
    conn.release()
    return result.rows[0]
  }

  async update(id: string, p: Product): Promise<Product> {
    const conn = await client.connect()
    const result = await conn.query(
      'UPDATE products SET name=$1, description=$2, price=$3, image_url=$4 WHERE id=$5 RETURNING *',
      [p.name, p.description, p.price, p.image_url, id]
    )
    conn.release()
    return result.rows[0]
  }

  async delete(id: string): Promise<Product> {
    const conn = await client.connect()
    const result = await conn.query('DELETE FROM products WHERE id=$1 RETURNING *', [id])
    conn.release()
    return result.rows[0]
  }
}
