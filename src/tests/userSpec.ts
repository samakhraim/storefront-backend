import { UserStore } from '../models/user'

const store = new UserStore()

describe('User Model', () => {
  const testUser = {
    first_name: 'John',
    last_name: 'Doe',
    password: '123'
  }

  let createdUserId: number

  it('should create a user', async () => {
    const result = await store.create(testUser)
    createdUserId = result.id as number
    expect(result.first_name).toEqual('John')
  })

  it('should return a list of users', async () => {
    const result = await store.index()
    expect(result.length).toBeGreaterThan(0)
  })

  it('should return the correct user', async () => {
    const result = await store.show(createdUserId.toString())
    expect(result.first_name).toEqual('John')
  })

  it('should update a user', async () => {
    const result = await store.update(createdUserId.toString(), {
      first_name: 'Updated',
      last_name: 'User',
      password: '456'
    })
    expect(result.first_name).toEqual('Updated')
  })

  it('should authenticate the user', async () => {
    const result = await store.authenticate('Updated', '456')
    expect(result).not.toBeNull()
  })

  it('should delete the user', async () => {
    const result = await store.delete(createdUserId.toString())
    expect(result.first_name).toEqual('Updated')
  })
})
