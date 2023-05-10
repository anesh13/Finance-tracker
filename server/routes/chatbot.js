import express from 'express';

import chatbot from '../controllers/chatbotController.js';
// import { checkAuth } from '../Utils/passport.js';

const router = express.Router();
router.post('/', chatbot);

export default router;
