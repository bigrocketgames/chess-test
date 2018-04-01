import React, { Component } from 'react';
import './App.css';

import GameBoard from './components/gameBoard';
import Message from './components/message';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to My Chess Test</h1>
        </header>
        <section className="game">
          <GameBoard />
        </section>
        <section className="moves">
        </section>
        <section className="messages">
          <Message />
        </section>
      </div>
    );
  }
}

export default App;
