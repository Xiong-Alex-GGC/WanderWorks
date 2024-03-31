import { getAllTransportations } from '../controllers/transportationController';

// Mock the response object
const mockRes = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

test('getAllTransportations', async () => {
  const req = {}; // Mock request object
  const res = mockRes(); // Mock response object

  await getAllTransportations(req, res);
  
  expect(res.send).toHaveBeenCalled(); // Check if res.send was called
  expect(res.status).not.toHaveBeenCalledWith(500); // Check if there was no internal server error
}, 30000);
``