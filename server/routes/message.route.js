import express from 'express';
import { verifyUser } from '../middlewares/auth.middleware.js';
import { getMessage } from '../controllers/message.controllers.js';

const router = express.Router();


// get message
router.get('/getmessage', verifyUser, getMessage)

export default router;