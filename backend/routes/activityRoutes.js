// routes/activityRoutes.js
import express from 'express';
import * as activityController from '../controllers/activityController.js';

const router = express.Router();

router.get('/activities', activityController.getAllActivities);
router.post('/create-activity', activityController.createActivity);
router.post('/update-activity', activityController.updateActivity);
router.get('/activity/:id', activityController.getActivityById);

export default router;
