import express from 'express';
import * as accommodationController from '../controllers/accommodationController.js';

const router = express.Router();

//routes the controller to a specific url to request/resonse
//router.get('/activities', activityController.getAllActivities);
//router.get('/activities/:id', activityController.getItineraryActivities);
router.post('/create-Accommodation', accommodationController.createAccommodation);
//router.post('/update-activity', activityController.updateActivity);
//router.get('/transportation/:id', transportationController.getTransporationById);
//router.delete('/delete-activity', activityController.deleteActivity);

export default router;