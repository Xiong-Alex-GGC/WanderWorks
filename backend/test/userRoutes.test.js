const request = require('supertest');
const app = require('../app'); // Replace with the actual path to your app file

describe('User Routes', () => {
  test('GET /users should return all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    // Add more assertions to validate the response data
  });
});