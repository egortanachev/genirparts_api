import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import router from './routes/router.js';

const PORT = 5001;
const DB_URL = 'mongodb+srv://egor1284:egor1284@cluster0.6o0nm3j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const app = express();

// Fix for __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());
app.use('/api', router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  console.log(req.query);
  res.status(200).json('Сервер работает');
});

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => {
      console.log("Starting server");
    })
  } catch (e) {
    console.log(e)
  }
}

startApp();