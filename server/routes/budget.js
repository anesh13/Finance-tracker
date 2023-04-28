import express from 'express';

import {
  createBudget,
  getAllBudgets,
  //   getBudget,
  updateBudget,
  //   removeBudget,
} from '../controllers/budgetController';

const router = express.Router();
router.post('/create', createBudget);
router.get('/getAll', getAllBudgets);
router.put('/:id', updateBudget);

export default router;
