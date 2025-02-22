import express from 'express';

import { addTransaction, getAllTransactions, getTransaction } from '../controllers/transactionController.js';

import { checkAuth } from '../Utils/passport.js'; // to get userId

const router = express.Router();
router.post('/create', checkAuth, addTransaction);
router.get('/byCategory', checkAuth, getTransaction);
router.get('/all', checkAuth, getAllTransactions);
export default router;
