import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Numbers extends React.Component {

  renderNumber(i) {
    return (
      <Number
        value={i}
      />
    );
  }

  render() {
    return (
      <div className="number-buttons">
        {this.renderNumber(1)}
        {this.renderNumber(2)}
        {this.renderNumber(3)}
        {this.renderNumber(4)}
        {this.renderNumber(5)}
        {this.renderNumber(6)}
        {this.renderNumber(7)}
        {this.renderNumber(8)}
        {this.renderNumber(9)}
        {this.renderNumber(10)}
      </div>
    );
  }
}

function Number(props) {
  return (
    <div
      className="number-button-item"
      id="clickable">
      {props.value}
    </div>
  );
}

class Operations extends React.Component {
  renderOperation(val) {
    return (
      <Operation
        value={val}
      />
    );
  }

  render() {
    return (
      <div className="op-buttons">
        {this.renderOperation("+")}
        {this.renderOperation("-")}
        {this.renderOperation("x")}
        {this.renderOperation("/")}
      </div>
    );
  }
}

function Operation(props) {
  return (
    <div
      className="op-button-item"
      id="clickable">
      {props.value}
    </div>
  );
}

class Grid extends React.Component {

  //TODO: have proper state, separate class for each item in the grid
  render() {
    return (
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
    );
  }
}

class Game extends React.Component {

  render() {
    return (
      <div className="container">
        <h1>Ruboku</h1>
        <p>Moves: 0</p>
        <div className="undo-button">Undo Last Move</div>
        <Grid/>
        <Numbers/>
        <Operations/>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
