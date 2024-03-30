//import request from 'supertest';
import express from 'express';
import itineraryRoutes from '../routes/itineraryRoutes';

const request = require('supertest');
const app = require('../routes/itineraryRoutes.js'); // Replace with the actual path to your app file

describe('itineraryRoutes module', () => {
  test('GET /itineraries returns a list of all itineraries', async () => {
    const response = await request(app).get('/itineraries');
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

});
