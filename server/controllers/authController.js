import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { cookieOptions } from '../middleware/requireAuth.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const sessionLengthMs = 7 * 24 * 60 * 60 * 1000;

function validateCredentials(body, { registration = false } = {}) {
  const input = body && typeof body === 'object' ? body : {};
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
  const password = typeof input.password === 'string' ? input.password : '';

  if (registration && (name.length < 2 || name.length > 80)) {
    return { error: 'Imię i nazwisko musi mieć od 2 do 80 znaków.' };
  }
  if (email.length > 254 || !emailPattern.test(email)) {
    return { error: 'Podaj poprawny adres e-mail.' };
  }
  if (!password) return { error: 'Wpisz hasło.' };
  if (registration && password.length < 10) {
    return { error: 'Hasło musi mieć co najmniej 10 znaków.' };
  }
  if (Buffer.byteLength(password, 'utf8') > 72) {
    return { error: 'Hasło może mieć maksymalnie 72 bajty.' };
  }

  return { value: { name, email, password } };
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

function issueSession(user, res) {
  const token = jwt.sign({}, process.env.SESSION_SECRET, {
    subject: user.id,
    expiresIn: '7d',
  });
  res.cookie('dziennik_session', token, {
    ...cookieOptions(),
    maxAge: sessionLengthMs,
  });
}

export async function register(req, res, next) {
  const result = validateCredentials(req.body, { registration: true });
  if (result.error) return res.status(400).json({ message: result.error });

  try {
    const { name, email, password } = result.value;
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash });
    issueSession(user, res);
    return res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Konto z tym adresem e-mail już istnieje.' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Sprawdź poprawność danych formularza.' });
    }
    return next(error);
  }
}

export async function login(req, res, next) {
  const result = validateCredentials(req.body);
  if (result.error) return res.status(400).json({ message: result.error });

  try {
    const { email, password } = result.value;
    const user = await User.findOne({ email }).select('+passwordHash');
    const passwordMatches = user && await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Nieprawidłowy adres e-mail lub hasło.' });
    }

    issueSession(user, res);
    return res.json({ user: publicUser(user) });
  } catch (error) {
    return next(error);
  }
}

export function logout(_req, res) {
  res.clearCookie('dziennik_session', cookieOptions());
  return res.json({ message: 'Wylogowano.' });
}

export function currentSession(req, res) {
  return res.json({ user: publicUser(req.user) });
}
