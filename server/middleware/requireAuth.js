import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export async function requireAuth(req, res, next) {
  const token = req.cookies.dziennik_session;
  if (!token) return res.status(401).json({ message: 'Zaloguj się, aby kontynuować.' });

  let claims;
  try {
    claims = jwt.verify(token, process.env.SESSION_SECRET);
  } catch {
    res.clearCookie('dziennik_session', cookieOptions());
    return res.status(401).json({ message: 'Sesja wygasła. Zaloguj się ponownie.' });
  }

  const user = await User.findById(claims.sub).select('name email');
  if (!user) return res.status(401).json({ message: 'Sesja wygasła. Zaloguj się ponownie.' });
  req.user = user;
  return next();
}

export function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  };
}
