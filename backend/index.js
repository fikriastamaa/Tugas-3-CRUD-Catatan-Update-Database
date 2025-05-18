import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import NoteRoute from './routes/NoteRoute.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Konfigurasi CORS agar mendukung kredensial (cookies) dan frontend tertentu
app.use(cors({
  origin: [
    'https://pemuda-tobat.uc.r.appspot.com/'
    // Tambahkan origin lain jika diperlukan
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware untuk parsing cookie
app.use(cookieParser());

// Middleware untuk parsing body JSON
app.use(express.json());

// Routing
app.use(NoteRoute);

// Endpoint pengecekan server
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Jalankan server
app.listen(5000, () => console.log('Server running on port 5000'));