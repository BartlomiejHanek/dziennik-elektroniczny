import { Router } from 'express';
import { currentSession, login, logout, register } from '../controllers/authController.js';
import { authRateLimit } from '../middleware/authRateLimit.js';
import { requireAuth } from '../middleware/requireAuth.js';

export const authRoutes = Router();

authRoutes.post('/register', authRateLimit, register);
authRoutes.post('/login', authRateLimit, login);
authRoutes.post('/logout', logout);
authRoutes.get('/me', requireAuth, currentSession);
