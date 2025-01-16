// pages/api/items/index.js

import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'items.json');

// Read items from JSON file
const readItems = () => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }
  return [];
};

// API handler
export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const items = readItems();
      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to load items.' });
    }
  }

  if (req.method === 'POST') {
    const { title, price, image, sellerId } = req.body;

    if (!title || !price || !image || !sellerId) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      const items = readItems();
      const newItem = {
        id: Date.now(),
        title,
        price,
        image,
        sellerId,  // Link item to the seller
      };

      items.push(newItem);
      fs.writeFileSync(filePath, JSON.stringify(items, null, 2));

      return res.status(201).json({ message: 'Item added successfully!', item: newItem });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to add item.' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
