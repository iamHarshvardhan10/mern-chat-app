import express from 'express';
import { login, signup } from '../controllers/auth.controllers.js';

const router = express.Router();

// Sign-up route
router.post('/signup', signup);
// login
router.post('/login', login)

export default router;