// pages/api/dashboard1/[id].js
import pool from '../../../lib/db';  // Ensure this is correct

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Query to fetch seller data or items by ID
      const result = await pool.query('SELECT * FROM sellers WHERE id = $1', [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Seller not found.' });
      }

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching seller:', error);
      return res.status(500).json({ message: 'Failed to load seller data.' });
    }
  }

  // Handle unsupported methods
  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
