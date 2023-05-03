import express from 'express';

import { createAccount, getAllAccounts } from '../controllers/accountController.js';
import { checkAuth } from '../Utils/passport.js';

const router = express.Router();
router.post('/create', createAccount);
router.get('/all', checkAuth, getAllAccounts);

export default router;
