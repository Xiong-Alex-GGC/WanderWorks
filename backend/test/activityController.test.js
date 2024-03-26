import * as activityController from '../controllers/activityController.js';

// Import the activityModel module and its functions
import * as activityModel from '../models/activityModel.js';
// Import the jest module
import jest from 'jest';



describe('Activity Controller', () => {
  describe('getAllActivities', () => {
    it('should return a list of activities', async () => {
      const mockActivities = [{ id: 1, name: 'Activity 1' }, { id: 2, name: 'Activity 2' }];
      // Mock the implementation of getAllActivities
      activityController.getAllActivities.mockResolvedValue(mockActivities);

      const req = {};
      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await activityController.getAllActivities(req, res);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(mockActivities);
    });

    it('should handle errors', async () => {
      // Mock the implementation of getAllActivities to throw an error
      activityController.getAllActivities.mockRejectedValue(new Error('Database error'));

      const req = {};
      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await activityController.getAllActivities(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
});
