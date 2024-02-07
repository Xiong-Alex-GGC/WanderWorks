// controllers/activityController.js
import * as activityModel from '../models/activityModel.js';

export const getAllActivities = async (req, res) => {
  try {
    const list = await activityModel.getAllActivities();
    res.send(list);
  } catch (error) {
    console.error('Error fetching Activity data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createActivity = async (req, res) => {
  try {
    const data = req.body;
    console.log("Data of Activity ", data);

    await activityModel.createActivity(data);
    res.send({ msg: "Activity Added" });
  } catch (error) {
    console.error('Error creating Activity data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateActivity = async (req, res) => {
  try {
    const id = req.body.id;
    const data = req.body;

    await activityModel.updateActivity(id, data);
    res.send({ msg: "Activity Updated" });
  } catch (error) {
    console.error('Error updating Activity data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getActivityById = async (req, res) => {
  const id = req.params.id;

  try {
    const activityData = await activityModel.getActivityById(id);

    if (activityData) {
      res.json(activityData);
    } else {
      res.status(404).json({ error: 'Activity not found' });
    }
  } catch (error) {
    console.error('Error fetching specific Activity data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
