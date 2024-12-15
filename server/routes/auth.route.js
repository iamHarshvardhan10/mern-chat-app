import express from 'express';
import { login, signup, getUserInfo, updateprofile, addprofileimage, removeprofileimage, logout } from '../controllers/auth.controllers.js';
import { verifyUser } from '../middlewares/auth.middleware.js';
import multer from 'multer';


const router = express.Router();

const upload = multer({ dest: "uploads/profiles/" })
// Sign-up route
router.post('/signup', signup);
// login
router.post('/login', login)
// get user info
router.get('/userInfo', verifyUser, getUserInfo)
// update profile
router.post('/updateprofile', verifyUser, updateprofile)
// adding image
router.post('/addprofileimage', verifyUser, upload.single("profile-image"), addprofileimage)
router.post('/removeprofileimage', verifyUser, removeprofileimage)

// logout
router.post('/logout', logout);
export default router;