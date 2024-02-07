// controllers/userController.js
import * as userModel from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const list = await userModel.getAllUsers();
    res.send(list);
  } catch (error) {
    console.error('Error fetching User data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createUser = async (req, res) => {
  try {
    const data = req.body;
    console.log("Data of User ", data);

    await userModel.createUser(data);
    res.send({ msg: "User Added" });
  } catch (error) {
    console.error('Error creating User data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.body.id;
    const data = req.body;

    await userModel.updateUser(id, data);
    res.send({ msg: "User Updated" });
  } catch (error) {
    console.error('Error updating User data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const userData = await userModel.getUserById(id);

    if (userData) {
      res.json(userData);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching specific User data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
