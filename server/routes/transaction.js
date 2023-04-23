import express from 'express';

import { addTransaction, getTransaction } from '../controllers/transactionController.js';

const router = express.Router();
router.post('/create', addTransaction);
router.get('/byCategory', getTransaction);
export default router;
