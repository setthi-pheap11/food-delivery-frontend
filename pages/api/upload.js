import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const uploadDir = path.join(process.cwd(), '/public/uploads');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB limit
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error during file upload:', err);
      return res.status(500).json({ message: 'File upload failed.' });
    }

    const file = files.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const filePath = `/uploads/${path.basename(file.filepath)}`;
    res.status(200).json({ imageUrl: filePath });
  });
}
