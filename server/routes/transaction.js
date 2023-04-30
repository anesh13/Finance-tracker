import express from 'express';

import { addTransaction, getTransaction } from '../controllers/transactionController.js';

import { checkAuth } from '../Utils/passport.js';

const router = express.Router();
router.post('/create', addTransaction);
router.get('/byCategory', checkAuth, getTransaction);
export default router;
