import { UserStore } from '../models/user'

const store = new UserStore()

describe('User Model', () => {
  let createdUserId: number

  const testUser = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com', // ✅ added email
    password: '123'
  }

  it('should create a new user', async () => {
    const result = await store.create(testUser)
    createdUserId = result.id!
    expect(result.first_name).toBe('John')
    expect(result.email).toBe('john@example.com')
  })

  it('should show user details', async () => {
    const result = await store.show(createdUserId.toString())
    expect(result.id).toBe(createdUserId)
    expect(result.email).toBe('john@example.com')
  })

  it('should update the user', async () => {
    const result = await store.update(createdUserId.toString(), {
      first_name: 'Updated',
      last_name: 'Doe',
      email: 'updated@example.com', // ✅ added email
      password: '456'
    })
    expect(result.first_name).toBe('Updated')
    expect(result.email).toBe('updated@example.com')
  })

  it('should list all users', async () => {
    const result = await store.index()
    expect(result.length).toBeGreaterThan(0)
  })

  it('should delete the user', async () => {
    const result = await store.delete(createdUserId.toString())
    expect(result.id).toBe(createdUserId)
  })
})
