import express from 'express';
import { getAllUsers } from '../controllers/userController.js';
import { protect, isManager } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, isManager, getAllUsers);

export default router;
