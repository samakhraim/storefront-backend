import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import authRoutes from './handlers/auth';
import productRoutes from './handlers/products';
import usersRoutes from './handlers/users';
import ordersRoutes from './handlers/orders';
import orderProductRoutes from './handlers/orderProducts';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Auth routes FIRST
app.use('/auth', authRoutes);

// Other routes
productRoutes(app);
usersRoutes(app);
ordersRoutes(app);
orderProductRoutes(app);

app.get('/', (req, res) => {
  res.send('API running');
});

// IMPORTANT: Only start the server when not testing
if (process.env.ENV !== 'test') {
  app.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
  });
}

export default app;   // ✔ FIX: Allows supertest/Jest to import it
