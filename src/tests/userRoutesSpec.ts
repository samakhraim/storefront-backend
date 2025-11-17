import supertest from 'supertest'
import app from '../server'

const request = supertest(app)

describe('User Endpoints', () => {
  let token: string
  let userId: number

  it('POST /users should create a user', async () => {
    const res = await request
      .post('/users')
      .send({
        first_name: 'Sam',
        last_name: 'Tester',
        password: '123'
      })
    expect(res.status).toBe(200)

    token = res.body.token
    userId = res.body.user.id
    expect(token).toBeDefined()
    expect(userId).toBeDefined()
  })

  it('POST /users/authenticate should return a token', async () => {
    const res = await request
      .post('/users/authenticate')
      .send({
        first_name: 'Sam',
        password: '123'
      })
    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()
  })

  it('GET /users should list users', async () => {
    const res = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBeTrue()
  })

  it('GET /users/:id should return a user', async () => {
    const res = await request
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(userId)
  })

  it('PUT /users/:id should update user info', async () => {
    const res = await request
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        first_name: 'SamUpdated',
        last_name: 'Tester',
        password: '456'
      })
    expect(res.status).toBe(200)
    expect(res.body.first_name).toBe('SamUpdated')
  })

  it('DELETE /users/:id should delete the user', async () => {
    const res = await request
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })
})
