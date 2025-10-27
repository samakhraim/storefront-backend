import client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env

export type User = {
  id?: number
  first_name: string
  last_name: string
  password: string
}

export class UserStore {
  //  Read All Users
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect()
      const result = await conn.query('SELECT id, first_name, last_name FROM users')
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Unable to get users: ${err}`)
    }
  }

  //  Read One User by ID
  async show(id: string): Promise<User> {
    try {
      const conn = await client.connect()
      const result = await conn.query('SELECT id, first_name, last_name FROM users WHERE id=($1)', [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable to find user ${id}: ${err}`)
    }
  }

  //  Create a New User (Password Hashed)
  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect()
      const hash = bcrypt.hashSync(
        u.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      )

      const result = await conn.query(
        'INSERT INTO users (first_name, last_name, password_digest) VALUES($1, $2, $3) RETURNING id, first_name, last_name',
        [u.first_name, u.last_name, hash]
      )

      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable to create user (${u.first_name} ${u.last_name}): ${err}`)
    }
  }

  //  Update an Existing User
  async update(id: string, u: User): Promise<User> {
    try {
      const conn = await client.connect()
      const hash = bcrypt.hashSync(
        u.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      )

      const result = await conn.query(
        'UPDATE users SET first_name=$1, last_name=$2, password_digest=$3 WHERE id=$4 RETURNING id, first_name, last_name',
        [u.first_name, u.last_name, hash, id]
      )

      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable to update user ${id}: ${err}`)
    }
  }

  //  Delete a User
  async delete(id: string): Promise<User> {
    try {
      const conn = await client.connect()
      const result = await conn.query('DELETE FROM users WHERE id=$1 RETURNING id, first_name, last_name', [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable to delete user ${id}: ${err}`)
    }
  }

  //  Authenticate (Login)
  async authenticate(first_name: string, password: string): Promise<User | null> {
    try {
      const conn = await client.connect()
      const result = await conn.query(
        'SELECT * FROM users WHERE first_name=$1',
        [first_name]
      )

      if (result.rows.length) {
        const user = result.rows[0]

        // compare password
        if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password_digest)) {
          conn.release()
          // return user without password
          return { id: user.id, first_name: user.first_name, last_name: user.last_name, password: '' }
        }
      }

      conn.release()
      return null
    } catch (err) {
      throw new Error(`Authentication failed: ${err}`)
    }
  }
}
