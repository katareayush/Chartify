import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { Data, AccessLog, EnergyData } from './model.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });
const app = express();

app.use(cors());
app.use(express.json());

const mongoDBuri = process.env.MONGODB_URI;

if (!mongoDBuri) {
  console.error('MongoDB URI is undefined. Check your .env file.');
  process.exit(1);
}

app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
});

app.post('/api/log-access', async (req, res) => {
  try {
    const { accessTime, accessDate, employeeName, algoStatus } = req.body;
    
    const newLog = new AccessLog({
      accessTime,
      accessDate,
      employeeName,
      algoStatus
    });

    await newLog.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log access', details: error.message });
  }
});

app.post('/api/filtered-data', async (req, res) => {
  try {
    const { algoStatus } = req.body;
    
    const filteredData = await EnergyData.find({ algo_status: algoStatus })
      .sort({ createdAt: 1 });

    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch filtered data', details: error.message });
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
