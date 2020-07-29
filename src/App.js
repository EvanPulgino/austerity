import React from 'react';
import { Game } from './features/game/Game';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 id="app-title" className="App-title">Austerity</h1>
        <Game />
      </header>
    </div>
  );
}

export default App;
