import express from 'express';  
import { protectRoute } from '../middleware/auth.middleware.js';
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendReqs, getRecommenedUsers, sendFriendRequest } from '../controllers/user.controller.js';

const router = express.Router();

// apply to auth middleware to all routes
router.use(protectRoute)

router.get('/', getRecommenedUsers);
router.get('/friends', getMyFriends);

router.post('/friend-request/:id', sendFriendRequest);
router.post('/friend-request/:id/accept', acceptFriendRequest);

router.get('/friend-requests', getFriendRequests);
router.get('/outgoing-friend-requests', getOutgoingFriendReqs);

export default router;