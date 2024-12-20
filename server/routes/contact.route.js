import express from 'express';
import { verifyUser } from '../middlewares/auth.middleware.js';
import { getContactsForDMList, searchContacts } from '../controllers/contact.controllers.js';


const router = express.Router();

router.post('/search', verifyUser, searchContacts)
router.get('/getContactsForDMList', verifyUser, getContactsForDMList)
export default router;