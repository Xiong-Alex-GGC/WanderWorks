import * as accommodationModel from '../models/accommodationModel.js';
//import { createAccommodation as createAccommodationModel } from '../models/accommodationModel.js';

export const getAllAccommodations = async (req, res) => {
  try {
    const list = await accommodationModel.getAllAccommodations(); //create a list of all the activity documents in the collection
    res.send(list); //res is essentially a return statement
  } catch (error) {
    console.error('Error fetching Accommodation data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getItineraryAccommodations = async (req, res) => {
  try {
    const list = await accommodationModel.getAllItineraryAccommodations(req.params.id);
    res.send(list);
  } catch (error) {
    console.error('Error fetching Itinerary data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createAccommodation = async (req, res) => {
  try {
    const data = req.body;
    console.log("Data of Accommodation ", data);
  
    await accommodationModel.createAccommodation(data);
    res.send({ msg: "Accommodation Added" });
  } catch (error) {
    console.error('Error creating Accommodation data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateAccommodation = async (req, res) => {
  try {
    const id = req.body.id;
    const data = req.body;

    await accommodationModel.updateAccommodation(id, data);
    res.send({ msg: "Accommodation Updated" });
  } catch (error) {
    console.error('Error updating Accommodation data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAccommodationById = async (req, res) => {
  const id = req.params.id;

  try {
    const accommodationData = await accommodationModel.getAccommodationById(id);

    if (accommodationData) {
      res.json(accommodationData);
    } else {
      res.status(404).json({ error: 'Accommodation not found' });
    }
  } catch (error) {
    console.error('Error fetching specific Accommodation data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//deleteAccommodation
export const deleteAccommodation = async (req, res) => {
  const userID = req.body.userID; 
  const accommodationID = req.body.accommodationID;

  try {
    const deletionResult = await accommodationModel.deleteAccommodation(accommodationID);

    if (deletionResult) {
      res.send({ msg: "Accommodation Deleted" });
    } else {
      res.status(404).json({ error: 'Accommodation not found' });
    }
  } catch (error) {
    console.error('Error deleting Accommodation data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};