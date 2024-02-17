import * as accommodationModel from '../models/accommodationModel.js';
//import { createAccommodation as createAccommodationModel } from '../models/accommodationModel.js';

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