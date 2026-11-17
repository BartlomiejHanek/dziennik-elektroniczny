import 'dotenv/config';
import app from './app.js';
import { connectToDatabase } from './config/database.js';

const port = Number(process.env.PORT) || 4000;

if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
  console.error('SESSION_SECRET musi mieć co najmniej 32 znaki.');
  process.exit(1);
}

try {
  await connectToDatabase();
  app.listen(port, () => console.log(`API działa na porcie ${port}.`));
} catch (error) {
  console.error('Nie udało się połączyć z MongoDB. Sprawdź lokalny plik .env i dostęp do Atlas.');
  process.exit(1);
}
