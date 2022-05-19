import React from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';
import Main from './components/MainComponent';

function App() {
  return (
    <HashRouter>
      <Main />
    </HashRouter>
  );
}

export default App;
