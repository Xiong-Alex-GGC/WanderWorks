import express from 'express';
import * as itineraryController from '../controllers/itineraryController.js';

const router = express.Router();

router.get('/itineraries', itineraryController.getAllItineraries);
router.get('/itineraries/:id', itineraryController.getAllUserItineraries);
router.post('/create-itinerary', itineraryController.createItinerary);
router.post('/update', itineraryController.updateItinerary);
router.get('/itinerary/:id', itineraryController.getItineraryById);
router.delete('/delete-itinerary', itineraryController.deleteItinerary);


export default router;
