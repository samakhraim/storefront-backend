import bcrypt from 'bcrypt';
import client from '../database';

const saltRounds = 10;

export async function seedUsers() {
  try {
    const conn = await client.connect();

    console.log('🌱 Seeding users...');

    // Create hashed passwords
    const password1 = await bcrypt.hash('password123', saltRounds);
    const password2 = await bcrypt.hash('secure456', saltRounds);

    // Insert sample users
    const sql = `
      INSERT INTO users (first_name, last_name, email, password_digest)
      VALUES 
        ('John', 'Doe', 'john@mail.com', $1),
        ('Sarah', 'Smith', 'sarah@mail.com', $2)
      ON CONFLICT (email) DO NOTHING;
    `;

    await conn.query(sql, [password1, password2]);

    console.log('✅ Users seeded successfully!');
    conn.release();
  } catch (err) {
    console.error('❌ Error seeding users:', err);
  }
}

// ⬅ ADD THIS
seedUsers();
