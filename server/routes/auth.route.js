import express from 'express';
import { signup } from '../controllers/auth.controllers.js';

const router = express.Router();

// Sign-up route
router.post('/signup', signup);


export default router;