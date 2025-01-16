import fs from 'fs';
import path from 'path';

// Path to items.json
const filePath = path.join(process.cwd(), 'data', 'items.json');

// Function to read items
const readItems = () => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }
  return [];
};

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const items = readItems();
      const item = items.find(item => item.id === parseInt(id));

      if (!item) {
        return res.status(404).json({ message: 'Item not found.' });
      }

      return res.status(200).json(item);
    } catch (error) {
      console.error('Error fetching item:', error);
      return res.status(500).json({ message: 'Failed to load item.' });
    }
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
