import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { authRoutes } from './routes/authRoutes.js';

const app = express();
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const buildDirectory = path.join(projectRoot, 'dist');

app.disable('x-powered-by');
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api', (_req, res) => res.status(404).json({ message: 'Nie znaleziono endpointu.' }));

if (existsSync(buildDirectory)) {
  app.use(express.static(buildDirectory));
  app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(buildDirectory, 'index.html')));
}

app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({ message: 'Nieprawidłowy format danych.' });
  }
  console.error('Błąd serwera:', error.name || 'Error');
  return res.status(500).json({ message: 'Wystąpił błąd serwera. Spróbuj ponownie później.' });
});

export default app;
