// pages/api/items/[id].js
import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
      const result = await pool.query('SELECT id, title, price, image FROM items WHERE id = $1', [id]);


      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Item not found.' });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching item:', error);
      res.status(500).json({ message: 'Failed to load item.' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await pool.query('DELETE FROM items WHERE id = $1', [id]);
      res.status(200).json({ message: 'Item deleted successfully!' });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ message: 'Failed to delete item.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
