import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data/sellers.json');

const readSellers = () => {
  const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : '[]';
  return JSON.parse(data);
};

const saveSellers = (sellers) => {
  fs.writeFileSync(filePath, JSON.stringify(sellers, null, 2));
};

export default function handler(req, res) {
  const { email, password, firstName, lastName, phoneNumber } = req.body;

  if (req.method === 'POST') {
    const sellers = readSellers();
    const existingSeller = sellers.find(seller => seller.email === email);

    if (existingSeller) {
      if (existingSeller.password === password) {
        return res.status(200).json({ message: 'Login successful!', seller: existingSeller });
      } else {
        return res.status(401).json({ message: 'Invalid password!' });
      }
    } else {
      const newSeller = { id: Date.now(), firstName, lastName, email, phoneNumber, password };
      sellers.push(newSeller);
      saveSellers(sellers);
      return res.status(201).json({ message: 'Registration successful!', seller: newSeller });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
