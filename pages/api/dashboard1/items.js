import fs from 'fs';
import path from 'path';

// Path to the items.json file
const filePath = path.join(process.cwd(), 'data', 'items.json');

// Read items from the JSON file
const readItems = () => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }
  return [];
};

// Write items to the JSON file
const writeItems = (items) => {
  fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
};

// API handler for DELETE
export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      let items = readItems();

      // Filter out the item to delete
      const updatedItems = items.filter(item => item.id.toString() !== id);

      if (items.length === updatedItems.length) {
        return res.status(404).json({ message: 'Item not found.' });
      }

      writeItems(updatedItems);
      return res.status(200).json({ message: 'Item deleted successfully.' });
    } catch (error) {
      console.error('Error deleting item:', error);
      return res.status(500).json({ message: 'Failed to delete item.' });
    }
  }

  res.setHeader('Allow', ['DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
