import mongoose from 'mongoose';

function getMongoUri() {
  const template = process.env.MONGODB_URI;
  if (!template) throw new Error('Brak MONGODB_URI w pliku .env.');

  const username = encodeURIComponent(process.env.MONGODB_USERNAME ?? '');
  const password = encodeURIComponent(process.env.MONGODB_PASSWORD ?? '');

  return template
    .replaceAll('<db_username>', username)
    .replaceAll('<username>', username)
    .replaceAll('<db_password>', password)
    .replaceAll('<password>', password);
}

export async function connectToDatabase() {
  await mongoose.connect(getMongoUri(), {
    dbName: process.env.MONGODB_DB_NAME || 'dziennik_electroniczny',
    serverSelectionTimeoutMS: 12000,
  });
}
