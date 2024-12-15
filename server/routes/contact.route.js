import express from 'express';
import { verifyUser } from '../middlewares/auth.middleware.js';
import { searchContacts } from '../controllers/contact.controllers.js';

const router = express.Router();

router.post('/search', verifyUser, searchContacts)

export default router;