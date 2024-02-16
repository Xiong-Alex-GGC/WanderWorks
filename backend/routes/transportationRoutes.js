import express from 'express';
import * as transportationController from '../controllers/transportationController.js';

const router = express.Router();

//routes the controller to a specific url to request/resonse
//router.get('/activities', activityController.getAllActivities);
//router.get('/activities/:id', activityController.getItineraryActivities);
router.post('/create-transportation', transportationController.createTransportation);
//router.post('/update-activity', activityController.updateActivity);
//router.get('/transportation/:id', transportationController.getTransporationById);
//router.delete('/delete-activity', activityController.deleteActivity);

export default router;