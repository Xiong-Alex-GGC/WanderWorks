import { getAllActivities, createActivity, updateActivity, getActivityById, deleteActivity } from '../controllers/activityController';

describe('Activity Controller', () => {
  describe('getAllActivities', () => {
    it('should return a list of activities', async () => {
      // Mock request and response objects
      const req = {};
      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Call the function
      await getAllActivities(req, res);

      // Check if the response methods are called appropriately
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).toHaveBeenCalled(); // You can add more specific checks if needed
    });

    // Add more test cases as needed
  });

  // Add test cases for other functions like createActivity, updateActivity, etc.
});
