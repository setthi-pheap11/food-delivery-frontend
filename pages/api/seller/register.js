import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    const filePath = path.join(process.cwd(), 'data', 'sellers.json');

    // Read existing sellers
    let sellers = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath);
      sellers = JSON.parse(fileData);
    }

    // Check if email already exists
    const existingSeller = sellers.find((seller) => seller.email === email);
    if (existingSeller) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create a new seller
    const newSeller = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    };

    // Add to sellers array
    sellers.push(newSeller);

    // Save to sellers.json
    fs.writeFileSync(filePath, JSON.stringify(sellers, null, 2));

    return res.status(201).json({ message: 'Seller registered successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
