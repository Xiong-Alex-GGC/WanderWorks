import * as itineraryModel from '../models/itineraryModel.js';
import { createItinerary as createItineraryModel } from '../models/itineraryModel.js'; 


export const getAllItineraries = async (req, res) => {
  try {
    const list = await itineraryModel.getAllItineraries();
    res.send(list);
  } catch (error) {
    console.error('Error fetching Itinerary data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllUserItineraries = async (req, res) => {
  try {

    const list = await itineraryModel.getUserItineraries(req.params.id);
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

    // Assuming createItineraryModel returns the ID
    const createdItineraryID = await createItineraryModel(data);

    // Send the ID as part of the response
    res.json({ msg: "Itinerary Added", id: createdItineraryID });
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

export const deleteItinerary = async (req, res) => {
  const itineraryID = req.body.itineraryID;

  try {
    const deletionResult = await itineraryModel.deleteItinerary(itineraryID);

    if (deletionResult) {
      res.send({ msg: "Itinerary Deleted" });
    } else {
      res.status(404).json({ error: 'Itinerary not found' });
    }
  } catch (error) {
    console.error('Error deleting Itinerary data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addExpenses = async (id, expense) => {
    try {
    const itineraryData = await itineraryModel.getItineraryById(id);
    const startExpenses = itineraryData.totalExpenses;
    const newExpenses = startExpenses + expense;
    const data = {
      totalExpenses: newExpenses
    };
    await itineraryModel.updateItinerary(id, data);
    return ("Expense tracked for itinerary");
    //console.log("Hopefully this worked?");
  } catch (error) {
    console.error('Error updating itinerary with tracked expense:', error);
    //res.status(500).json({ error: 'Internal Server Error' });
  }
}

/*
export const removeExpenses = async (id, expense) => {

}
*/