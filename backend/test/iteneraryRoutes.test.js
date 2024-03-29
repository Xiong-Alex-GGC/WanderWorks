import express from 'express';
import itineraryRoutes from '../routes/itineraryRoutes';
import request from 'supertest';

const app = express(); // Create an Express application
app.use('/itineraries', itineraryRoutes); // Use your router with the Express app

describe('itineraryRoutes module', () => {
  test('GET /itineraries returns a list of all itineraries', async () => {
    const response = await request(app).get('/itineraries');
    expect(response.status).toBe(200);
    // Add more assertions as needed
  }, 10000); // Increase the timeout to 10 seconds
});
;
