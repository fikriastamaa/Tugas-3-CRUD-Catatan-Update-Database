import express from 'express';
import cors from 'cors';
import CatatanRoute from './routes/CatatanRoute.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(CatatanRoute);

app.listen(5000, () => console.log('Server telah terbobol di port 5000'));