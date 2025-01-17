// pages/api/seller/register.js
import pool from '../../../lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      // Check if email already exists
      const existingSeller = await pool.query('SELECT * FROM sellers WHERE email = $1', [email]);
      if (existingSeller.rows.length > 0) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert seller into DB
      await pool.query(
        'INSERT INTO sellers (first_name, last_name, email, phone_number, password) VALUES ($1, $2, $3, $4, $5)',
        [firstName, lastName, email, phoneNumber, hashedPassword]
      );

      res.status(201).json({ message: 'Seller registered successfully' });
    } catch (error) {
      console.error('Error registering seller:', error);
      res.status(500).json({ message: 'Registration failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
