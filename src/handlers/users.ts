import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserStore } from '../models/user'
import { verifyAuthToken } from '../middleware/auth'

const store = new UserStore()

//  GET /users - list all users (protected)
const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index()
    res.json(users)
  } catch (err) {
    res.status(400).json(err)
  }
}

//  GET /users/:id - show one user (protected)
const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id!)
    res.json(user)
  } catch (err) {
    res.status(400).json(err)
  }
}

//  POST /users - create new user (public)
const create = async (req: Request, res: Response) => {
  try {
    const user = await store.create(req.body)
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET!)
    res.json({ token, user })
  } catch (err) {
    res.status(400).json(err)
  }
}

// PUT /users/:id - update user (protected)
const update = async (req: Request, res: Response) => {
  try {
    const user = await store.update(req.params.id!, req.body)
    res.json(user)
  } catch (err) {
    res.status(400).json(err)
  }
}

//  DELETE /users/:id - delete user (protected)
const destroy = async (req: Request, res: Response) => {
  try {
    const user = await store.delete(req.params.id!)
    res.json(user)
  } catch (err) {
    res.status(400).json(err)
  }
}

//  POST /users/authenticate - login
const authenticate = async (req: Request, res: Response) => {
  try {
    const { first_name, password } = req.body
    const user = await store.authenticate(first_name, password)

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ user }, process.env.TOKEN_SECRET!)
    res.json({ token, user })
  } catch (err) {
    res.status(400).json(err)
  }
}

// Register all routes
const usersRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users', create)
  app.put('/users/:id', verifyAuthToken, update)
  app.delete('/users/:id', verifyAuthToken, destroy)
  app.post('/users/authenticate', authenticate)
}

export default usersRoutes
