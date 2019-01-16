import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Numbers(props) {
  return (
    <div className="number-buttons">
      {renderNumber(1, props)}
      {renderNumber(2, props)}
      {renderNumber(3, props)}
      {renderNumber(4, props)}
      {renderNumber(5, props)}
      {renderNumber(6, props)}
      {renderNumber(7, props)}
      {renderNumber(8, props)}
      {renderNumber(9, props)}
      {renderNumber(10, props)}
    </div>
  );
}

function renderNumber(i, props) {
  return (
    <Number
      value={i}
      divid={props.getDivId(i)}
      onClick={() => {props.handleClick(i);}}
    />
  );
}

function Number(props) {
  return (
    <div
      className="number-button-item"
      id={props.divid}
      onClick={props.onClick}>
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
  constructor(props) {
    super(props);
    this.state = {
      selectedNumbers: Array(10).fill(false),
      selectedNumber: -1,
    }
  }

  handleClick(i) {
    console.log("i=" + i);
    const value = i - 1;
    const selectedNumbers = this.state.selectedNumbers.slice();
    const selectedNum = this.state.selectedNumber;
    if (selectedNum !== -1) {
      selectedNumbers[selectedNum - 1] = false;
    }
    selectedNumbers[value] = true;
    console.log("Setting state");
    this.setState({
      selectedNumbers: selectedNumbers,
      selectedNumber: i,
    });
  }

  getDivId(i) {
    console.log("getDivId");
    const arrayValue = i - 1;
    const isSelected = this.state.selectedNumbers[arrayValue];
    console.log("i=" + arrayValue + " isSelected=" + isSelected);
    if (isSelected) {
      return "clicked";
    } else {
      return "clickable";
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Ruboku</h1>
        <p>Moves: 0</p>
        <div className="undo-button">Undo Last Move</div>
        <Grid/>
        <Numbers handleClick={(i) => this.handleClick(i)} getDivId={(i) => this.getDivId(i)}/>
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
