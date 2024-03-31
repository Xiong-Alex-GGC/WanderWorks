import express from 'express';
import * as accommodationController from '../controllers/accommodationController.js';

const router = express.Router();

//routes the controller to a specific url to request/resonse
router.get('/accommodations', accommodationController.getAllAccommodations);
router.get('/accommodations/:id', accommodationController.getItineraryAccommodations);
router.post('/create-accommodation', accommodationController.createAccommodation);
router.post('/update-accommodation', accommodationController.updateAccommodation);
router.get('/accommodation/:id', accommodationController.getAccommodationById);
router.delete('/delete-accommodation', accommodationController.deleteAccommodation);

export default router;