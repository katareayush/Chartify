import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Data } from './model.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });
const app = express();

app.use(cors());

app.use(express.json());

const mongoDBuri = process.env.MONGODB_URI;

if (!mongoDBuri) {
  console.error('MongoDB URI is undefined. Check your .env file.');
  process.exit(1); // Exit if URI is missing
}

app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);  
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
});

mongoose.connect(mongoDBuri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => {
      console.log('Server running on http://localhost:5000');
    });
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
