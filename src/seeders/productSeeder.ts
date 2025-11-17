import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.POSTGRES_HOST || '127.0.0.1',
  database: process.env.POSTGRES_DB || 'store_dev',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  port: 5432,
});

const products = [
  {
    name: 'Book',
    description: 'A fascinating novel for all readers.',
    price: 15,
    image_url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600'
  },
  {
    name: 'Phone',
    description: 'The latest smartphone with top specs.',
    price: 999,
    image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600'
  },
  {
    name: 'Laptop',
    description: 'High-performance laptop for professionals.',
    price: 1999,
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600'
  },
  {
    name: 'Smartwatch',
    description: 'Track your fitness and get notifications.',
    price: 299,
    image_url: 'https://images.unsplash.com/photo-1519744346363-66e00c9c57a9?w=600'
  },
  {
    name: 'Camera',
    description: 'Capture every moment in stunning detail.',
    price: 850,
    image_url: 'https://images.unsplash.com/photo-1519183071298-a2962e402c4d?w=600'
  },
  {
    name: 'Tablet',
    description: 'Perfect for reading, work, and entertainment.',
    price: 450,
    image_url: 'https://images.unsplash.com/photo-1587825140708-6b38da97517a?w=600'
  },
  {
    name: 'Headphones',
    description: 'Noise-cancelling and immersive sound quality.',
    price: 120,
    image_url: 'https://images.unsplash.com/photo-1580894732444-8ecded7900b1?w=600'
  },
  {
    name: 'Keyboard',
    description: 'Mechanical keyboard with RGB backlighting.',
    price: 180,
    image_url: 'https://images.unsplash.com/photo-1585079542156-2755d9c8a096?w=600'
  },
  {
    name: 'Monitor',
    description: '27-inch HD display with vivid colors.',
    price: 600,
    image_url: 'https://images.unsplash.com/photo-1587202372775-98927d51b47e?w=600'
  },
  {
    name: 'Gaming Chair',
    description: 'Ergonomic comfort for long gaming sessions.',
    price: 400,
    image_url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600'
  }
];

(async function seedProducts() {
  try {
    console.log('🌱 Seeding products with images into store_dev...');

    for (const p of products) {
      await pool.query(
        `
        INSERT INTO products (name, description, price, image_url)
        VALUES ($1, $2, $3, $4)
        `,
        [p.name, p.description, p.price, p.image_url]
      );
      console.log(`✅ Inserted: ${p.name}`);
    }

    console.log('🎉 Product seeding with images completed successfully!');
  } catch (err) {
    console.error('❌ Error during seeding:', err);
  } finally {
    await pool.end();
  }
})();
