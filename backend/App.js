import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import apiRoutes from './routes/apiRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();
const origins = (process.env.FRONTEND_ORIGINS || 'http://localhost:4200').split(',').map((origin) => origin.trim());

app.use(helmet());
app.use(cors({ origin: origins, methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'] }));
app.use(express.json({ limit: '32kb' }));
app.use('/api', rateLimit({ windowMs: 60_000, limit: 120, standardHeaders: 'draft-8', legacyHeaders: false }));
app.use('/api/chat', rateLimit({ windowMs: 60_000, limit: 12, standardHeaders: 'draft-8', legacyHeaders: false }));
app.use('/api', apiRoutes);
app.use(notFound);
app.use(errorHandler);

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`Huella Viva API disponible en http://localhost:${port}/api`));

export default app;
