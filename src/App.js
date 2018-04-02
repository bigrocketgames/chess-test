import React, { Component } from 'react';
import './App.css';

import GameBoard from './components/gameBoard';
import Message from './components/message';
import History from './components/history';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to My Chess Test</h1>
        </header>
        <div className="main">
          <div className="left">
            <section className="game">
              <GameBoard />
            </section>
          </div>
          <div className="right">
            <section className="history">
              <History />
            </section>
            <section className="messages">
              <Message />
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
