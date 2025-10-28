import supertest from 'supertest'
import app from '../server'

const request = supertest(app)

describe('User Endpoints', () => {
  let token: string
  let userId: number

  it('POST /users should create a user', async () => {
    const res = await request
      .post('/users')
      .send({ first_name: 'Sam', last_name: 'Tester', password: '123' })
    token = res.body.token
    userId = res.body.user.id
    expect(res.status).toBe(200)
  })

  it('POST /users/authenticate should return a token', async () => {
    const res = await request
      .post('/users/authenticate')
      .send({ first_name: 'Sam', password: '123' })
    expect(res.status).toBe(200)
  })

  it('GET /users should list users', async () => {
    const res = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })

  it('GET /users/:id should return a user', async () => {
    const res = await request
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })

  it('DELETE /users/:id should delete a user', async () => {
    const res = await request
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })
})
