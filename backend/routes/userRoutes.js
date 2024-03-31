// routes/userRoutes.js
import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/create-user', userController.createUser);
router.post('/profile/update', userController.updateUserProfile);
router.put('/update-user/:id/profile', userController.updateUserProfile); 
router.get('/user/:id', userController.getUserById);

export default router;
