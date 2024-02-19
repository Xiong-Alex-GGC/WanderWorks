import express from 'express';
import * as accommodationController from '../controllers/accommodationController.js';

const router = express.Router();

//routes the controller to a specific url to request/resonse
router.get('/accommodations', accommodationController.getAllAccommodations);
router.get('/accommodations/:id', accommodationController.getItineraryAccommodations);
router.post('/create-Accommodation', accommodationController.createAccommodation);
router.post('/update-activity', accommodationController.updateAccommodation);
router.get('/transportation/:id', accommodationController.getAccommodationById);
router.delete('/delete-activity', accommodationController.deleteAccommodation);

export default router;