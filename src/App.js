import './App.css';
import React from 'react';
import Router from './pages/router/Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '5px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

function App() {
  return (
    <main>
      <AlertProvider template={AlertTemplate} {...options}>
        <Router />
      </AlertProvider>
    </main>
  );
}

export default App;
