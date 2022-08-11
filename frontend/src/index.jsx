import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Route,  BrowserRouter, Router,Routes} from 'react-router-dom';
import { StateContextProvider } from './contexts/StateContextProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StateContextProvider>
    <App />
  </StateContextProvider>,
);

