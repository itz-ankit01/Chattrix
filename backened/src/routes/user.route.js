import express from 'express';  
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMyFriends, getRecommenedUsers } from '../controllers/user.controller.js';

const router = express.Router();

// apply to auth middleware to all routes
router.use(protectRoute)

router.get('/', getRecommenedUsers);
router.get('/friends', getMyFriends);

export default router;