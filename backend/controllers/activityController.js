// controllers/activityController.js
import * as activityModel from "../models/activityModel.js";
import { OverlappingItemError } from '../errors/OverlappingItemError.js';
import { ItemOutOfBoundsError } from '../errors/ItemOutOfBoundsError.js';

//Retriseves all activities from the db and returns it
export const getAllActivities = async (req, res) => {
  try {
    const list = await activityModel.getAllActivities(); //create a list of all the activity documents in the collection
    res.send(list); //res is essentially a return statement
  } catch (error) {
    console.error("Error fetching Activity data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getItineraryActivities = async (req, res) => {
  try {
    const list = await activityModel.getAllItineraryActivities(req.params.id);
    res.send(list);
  } catch (error) {
    console.error("Error fetching Itinerary data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//creates a new activity
export const createActivity = async (req, res) => {
  try {
    const data = req.body;
    console.log("Data of Activity ", data);

    await activityModel.createActivity(data);
    res.send({ msg: "Activity Added" });
  } catch (error) {
    console.error("Error creating Activity data:", error);
    if(error instanceof ItemOutOfBoundsError || error instanceof OverlappingItemError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

//updates a new activity
export const updateActivity = async (req, res) => {
  //console.log("Controller reached when attempting to update and activity");
  try {
    const id = req.body.id;
    const data = req.body;

    await activityModel.updateActivity(id, data);
    res.send({ msg: "Activity Updated" });
  } catch (error) {
    console.error('Error updating Activity data:', error);
    if(error instanceof ItemOutOfBoundsError || error instanceof OverlappingItemError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

//retrieves an activity by its Id
export const getActivityById = async (req, res) => {
  const id = req.params.id;

  try {
    const activityData = await activityModel.getActivityById(id);

    if (activityData) {
      res.json(activityData);
    } else {
      res.status(404).json({ error: "Activity not found" });
    }
  } catch (error) {
    console.error("Error fetching specific Activity data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//deleteActivity
export const deleteActivity = async (req, res) => {
  const userID = req.body.userID;
  const activityID = req.body.activityID;

  try {
    const deletionResult = await activityModel.deleteActivity(activityID);

    if (deletionResult) {
      res.send({ msg: "Activity Deleted" });
    } else {
      res.status(404).json({ error: "Activity not found" });
    }
  } catch (error) {
    console.error("Error deleting Activity data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/*
  update and creaate will return a number depending on the results:
  -1 - item set before the trip starts
  0 - good request
  1 - item set after trip ends
  2 - item overlaps with other item
*/