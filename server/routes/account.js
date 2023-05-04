import express from 'express';

import { createAccount, getAllAccounts } from '../controllers/accountController.js';
import { checkAuth } from '../Utils/passport.js'; // authenticate and get userID

const router = express.Router();
router.post('/create', checkAuth, createAccount);
router.get('/all', checkAuth, getAllAccounts);

export default router;
