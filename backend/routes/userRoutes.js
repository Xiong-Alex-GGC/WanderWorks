// routes/userRoutes.js
import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/create-user', userController.createUser);
router.post('/update-user', userController.updateUser);
router.get('/user/:id', userController.getUserById);

export default router;
