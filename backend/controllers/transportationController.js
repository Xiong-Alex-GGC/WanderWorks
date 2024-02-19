// controllers/transportationController.js
import * as transportationModel from '../models/transportationModel.js';

export const getAllTransportations = async (req, res) => {
  try {
    const list = await transportationModel.getAllTransportations(); //create a list of all the activity documents in the collection
    res.send(list); //res is essentially a return statement
  } catch (error) {
    console.error('Error fetching Transportation data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getItineraryTransportations = async (req, res) => {
  try {

    const list = await transportationModel.getAllItineraryTransportations(req.params.id);
    res.send(list);
  } catch (error) {
    console.error('Error fetching Itinerary data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createTransportation = async (req, res) => {
  try {
    const data = req.body;
    console.log("Data of Transportation ", data);
  
    await transportationModel.createTransportation(data);
    res.send({ msg: "Transportation Added" });
  } catch (error) {
    console.error('Error creating Transportation data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateTransportation = async (req, res) => {
  try {
    const id = req.body.id;
    const data = req.body;

    await transportationModel.updateTransportation(id, data);
    res.send({ msg: "Transportation Updated" });
  } catch (error) {
    console.error('Error updating Transportation data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//retrieves an activity by its Id
export const getTransportationById = async (req, res) => {
  const id = req.params.id;

  try {
    const transportationData = await transportationModel.getTransportationById(id);

    if (transportationData) {
      res.json(transportationData);
    } else {
      res.status(404).json({ error: 'Transportation not found' });
    }
  } catch (error) {
    console.error('Error fetching specific Transportation data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//deleteActivity
export const deleteTransportation = async (req, res) => {
  const userID = req.body.userID; 
  const transportationID = req.body.transportationID;

  try {
    const deletionResult = await transportationModel.deleteTransportation(transportationID);

    if (deletionResult) {
      res.send({ msg: "Transportation Deleted" });
    } else {
      res.status(404).json({ error: 'Transportation not found' });
    }
  } catch (error) {
    console.error('Error deleting Transportation data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};