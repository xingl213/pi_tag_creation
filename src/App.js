import React from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';
import Main from './components/Main';

function App() {
  return (
    <HashRouter>
      <Main />
    </HashRouter>
  );
}

export default App;
