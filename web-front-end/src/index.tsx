// 3rd party imports
import React from 'react';
import ReactDOM from 'react-dom/client';
// local imports
import './index.css';
import AppBase from './AppBase';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <AppBase />
  </React.StrictMode>
);

reportWebVitals();
