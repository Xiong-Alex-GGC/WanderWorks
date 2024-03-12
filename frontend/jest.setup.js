// jest.setup.js
import '@testing-library/jest-dom'; // Import the extend-expect library

// Configure JSDOM
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
});

global.document = dom.window.document;
global.window = dom.window;
global.navigator = dom.window.navigator;
