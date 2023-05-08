import express from 'express';

import { createGoal, getAllGoals, updateGoal } from '../controllers/goalController.js';
import { checkAuth } from '../Utils/passport.js';

const router = express.Router();
router.post('/create', checkAuth, createGoal);
router.get('/all', checkAuth, getAllGoals);
router.put('/update/:id', checkAuth, updateGoal);
export default router;
