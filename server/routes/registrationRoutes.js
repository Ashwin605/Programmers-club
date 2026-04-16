import express from 'express';
import { createRegistration, getRegistrations } from '../controllers/registrationController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(createRegistration).get(protect, admin, getRegistrations);

export default router;
