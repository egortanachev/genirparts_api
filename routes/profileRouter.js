import express from 'express';
const router = express.Router();
import ProfilesController from '../controllers/ProfilesController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.get('/:userId', authMiddleware, ProfilesController.getProfile);
router.put('/:userId', authMiddleware, ProfilesController.updateProfile);

export default router;