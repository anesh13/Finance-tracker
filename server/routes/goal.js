import express from 'express';

import { createGoal, getAllGoals } from '../controllers/goalController.js';
import { checkAuth } from '../Utils/passport.js';

const router = express.Router();
router.post('/create', checkAuth, createGoal);
router.get('/all', checkAuth, getAllGoals);
export default router;
