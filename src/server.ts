import express from 'express'
import bodyParser from 'body-parser'
import usersRoutes from './handlers/users'
import productRoutes from './handlers/products'
import ordersRoutes from './handlers/orders'
import orderProductRoutes from './handlers/orderProducts'

const app = express()
app.use(bodyParser.json())

// Root route
app.get('/', (req, res) => {
  res.send('Storefront backend is running!');
});

// Register all route handlers
usersRoutes(app)
productRoutes(app)
ordersRoutes(app)
orderProductRoutes(app)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})

export default app
