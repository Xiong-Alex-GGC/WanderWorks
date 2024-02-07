// controllers/itineraryController.js
import * as itineraryModel from '../models/itineraryModel.js';

export const getAllItineraries = async (req, res) => {
  try {
    const list = await itineraryModel.getAllItineraries();
    res.send(list);
  } catch (error) {
    console.error('Error fetching Itinerary data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createItinerary = async (req, res) => {
  try {
    const data = req.body;
    console.log("Data of Itinerary ", data);

    await itineraryModel.createItinerary(data);
    res.send({ msg: "Itinerary Added" });
  } catch (error) {
    console.error('Error creating Itinerary data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateItinerary = async (req, res) => {
  try {
    const id = req.body.id;
    const data = req.body;

    await itineraryModel.updateItinerary(id, data);
    res.send({ msg: "Itinerary Updated" });
  } catch (error) {
    console.error('Error updating Itinerary data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getItineraryById = async (req, res) => {
  const id = req.params.id;

  try {
    const itineraryData = await itineraryModel.getItineraryById(id);

    if (itineraryData) {
      res.json(itineraryData);
    } else {
      res.status(404).json({ error: 'Itinerary not found' });
    }
  } catch (error) {
    console.error('Error fetching specific Itinerary data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
