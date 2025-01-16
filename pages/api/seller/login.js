import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const filePath = path.join(process.cwd(), 'data', 'sellers.json');

    if (!fs.existsSync(filePath)) {
      return res.status(400).json({ message: 'No sellers found' });
    }

    const sellers = JSON.parse(fs.readFileSync(filePath));

    // Check if the seller exists
    const seller = sellers.find(
      (seller) => seller.email === email && seller.password === password
    );

    if (!seller) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', seller });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
