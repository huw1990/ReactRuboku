import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Game extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Ruboku</h1>
        <p>Moves: 0</p>
        <div className="undo-button">Undo Last Move</div>
        <div className="game-grid">
          <div className="game-item" id="emptygrid"> </div>
          <div className="game-item" id="gameclickable">v</div>
          <div className="game-item" id="gameclickable">v</div>
          <div className="game-item" id="gameclickable">v</div>
          <div className="game-item" id="gameclickable">></div>
          <div className="game-item">1</div>
          <div className="game-item">1</div>
          <div className="game-item">1</div>
          <div className="game-item" id="gameclickable">></div>
          <div className="game-item">1</div>
          <div className="game-item">1</div>
          <div className="game-item">1</div>
          <div className="game-item" id="gameclickable">></div>
          <div className="game-item">1</div>
          <div className="game-item">1</div>
          <div className="game-item">1</div>
        </div>
        <div className="number-buttons">
          <div className="number-button-item" id="clickable">1</div>
          <div className="number-button-item" id="clickable">2</div>
          <div className="number-button-item" id="clickable">3</div>
          <div className="number-button-item" id="clickable">4</div>
          <div className="number-button-item" id="clickable">5</div>
          <div className="number-button-item" id="clickable">6</div>
          <div className="number-button-item" id="clickable">7</div>
          <div className="number-button-item" id="clickable">8</div>
          <div className="number-button-item" id="clickable">9</div>
          <div className="number-button-item" id="clickable">10</div>
        </div>
        <div className="op-buttons">
          <div className="op-button-item" id="clickable">+</div>
          <div className="op-button-item" id="clickable">-</div>
          <div className="op-button-item" id="clickable">x</div>
          <div className="op-button-item" id="clickable">/</div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
