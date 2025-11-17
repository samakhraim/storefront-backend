CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending',
  total_price INTEGER DEFAULT 0,
  full_name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(50),
  shipping_address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  payment_method VARCHAR(50)
);
