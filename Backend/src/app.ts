import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import contactRoutes from './routes/contacts.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/contacts', contactRoutes);

export default app;
