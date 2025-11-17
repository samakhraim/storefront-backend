import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import productRoutes from './handlers/products'
import usersRoutes from './handlers/users'
import ordersRoutes from './handlers/orders'
import orderProductRoutes from './handlers/orderProducts'

const app: express.Application = express()
const address = 'http://localhost:3000'

app.use(cors())
app.use(bodyParser.json())

// ✅ register all routes
productRoutes(app)
usersRoutes(app)
ordersRoutes(app)
orderProductRoutes(app)

// root route (for sanity check)
app.get('/', (_req, res) => {
  res.send('✅ Storefront API is running!')
})

app.listen(3000, function () {
  console.log(`✅ Server running on ${address}`)
})

export default app
