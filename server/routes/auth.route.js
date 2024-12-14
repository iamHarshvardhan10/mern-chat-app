import express from 'express';
import { login, signup , getUserInfo , updateprofile } from '../controllers/auth.controllers.js';
import { verifyUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Sign-up route
router.post('/signup', signup);
// login
router.post('/login', login)
// get user info
router.get('/userInfo' ,verifyUser, getUserInfo)
// update profile
router.post('/updateprofile' , verifyUser , updateprofile)

export default router;