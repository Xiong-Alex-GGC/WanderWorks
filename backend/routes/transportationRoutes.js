import express from 'express';
import * as transportationController from '../controllers/transportationController.js';

const router = express.Router();

//routes the controller to a specific url to request/resonse
router.get('/transportations', transportationController.getAllTransportations);
router.get('/transportations/:id', transportationController.getItineraryTransportations);
router.post('/create-transportation', transportationController.createTransportation);
router.post('/update-transportation', transportationController.updateTransportation);
router.get('/transportation/:id', transportationController.getTransporationById);
router.delete('/delete-transportation', transportationController.deleteTransportation);

export default router;