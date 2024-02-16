// controllers/transportationController.js
import * as transportationModel from '../models/transportationModel.js';

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