import express from 'express'
import bodyParser from 'body-parser'
import usersRoutes from './handlers/users'

const app = express()
app.use(bodyParser.json())

// Root route to confirm the server is working
app.get('/', (req, res) => {
  res.send(' Storefront backend is running!');
});

// Attach user routes
usersRoutes(app)

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000')
})

export default app
