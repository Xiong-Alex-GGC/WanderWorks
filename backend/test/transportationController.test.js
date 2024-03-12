// controllers/transportationController.test.js
import * as transportationModel from '../models/transportationModel.js';

describe('Transportation Controller', () => {
  test('getAllTransportations should return a list of all transportations', async () => {
    const req = {};
    const res = {
      send: jest.fn()
    };

    await getAllTransportations(req, res);

    expect(res.send).toHaveBeenCalled();
  });

  test('getItineraryTransportations should return a list of transportation for a specific itinerary', async () => {
    const req = { params: { id: 'itineraryId' } };
    const res = {
      send: jest.fn()
    };

    await getItineraryTransportations(req, res);

    expect(res.send).toHaveBeenCalled();
  });

  test('createTransportation should add a new transportation', async () => {
    const req = { body: { /* transportation data */ } };
    const res = {
      send: jest.fn()
    };

    await createTransportation(req, res);

    expect(res.send).toHaveBeenCalledWith({ msg: "Transportation Added" });
  });

  test('updateTransportation should update an existing transportation', async () => {
    const req = { body: { id: 'transportationId', /* updated transportation data */ } };
    const res = {
      send: jest.fn()
    };

    await updateTransportation(req, res);

    expect(res.send).toHaveBeenCalledWith({ msg: "Transportation Updated" });
  });

  test('getTransportationById should return a specific transportation by ID', async () => {
    const req = { params: { id: 'transportationId' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await getTransportationById(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  test('deleteTransportation should delete a transportation', async () => {
    const req = { body: { userID: 'userId', transportationID: 'transportationId' } };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await deleteTransportation(req, res);

    expect(res.send).toHaveBeenCalledWith({ msg: "Transportation Deleted" });
  });
});