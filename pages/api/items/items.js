// pages/api/items/items.js
import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM items');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ message: 'Failed to load items.' });
    }
  } else if (req.method === 'POST') {
    const { title, price, image, sellerId } = req.body;

    if (!title || !price || !image || !sellerId) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      await pool.query(
        'INSERT INTO items (title, price, image, seller_id) VALUES ($1, $2, $3, $4)',
        [title, price, image, sellerId]
      );
      res.status(201).json({ message: 'Item added successfully!' });
    } catch (error) {
      console.error('Error adding item:', error);
      res.status(500).json({ message: 'Failed to add item.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
