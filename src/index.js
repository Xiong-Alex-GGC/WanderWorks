import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import router from './router/router';
import { RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <RouterProvider router={router}/>
  </>
);

