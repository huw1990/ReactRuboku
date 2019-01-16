import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//An enum for the part of the grid changer, i.e. either numbers or operations
var GridChangePart = Object.freeze({"NUMBER":1, "OPERATION":2});

//An enum for the various operation types
var OpType = Object.freeze({"NONE":-1, "ADD":1, "SUBTRACT":2, "MULTIPLY":3, "DIVIDE":4});

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
      divid={props.getDivId(i, GridChangePart.NUMBER)}
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

function Operations(props) {
  return (
    <div className="op-buttons">
      {renderOperation("+", OpType.ADD, props)}
      {renderOperation("-", OpType.SUBTRACT, props)}
      {renderOperation("x", OpType.MULTIPLY, props)}
      {renderOperation("/", OpType.DIVIDE, props)}
    </div>
  );
}

function renderOperation(val, opType, props) {
    return (
      <Operation
        value={val}
        divid={props.getDivId(opType, GridChangePart.OPERATION)}
        onClick={() => {props.handleClick(opType);}}
      />
    );
  }

function Operation(props) {
  return (
    <div
      className="op-button-item"
      id={props.divid}
      onClick={props.onClick}>
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
      selectedOps: Array(4).fill(false),
      selectedOp: OpType.NONE,
    }
  }

  handleNumberClick(i) {
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

  handleOperationClick(i) {
    console.log("i=" + i);
    const value = i - 1;
    const selectedOps = this.state.selectedOps.slice();
    const selectedOp = this.state.selectedOp;
    if (selectedOp !== OpType.NONE) {
      selectedOps[selectedOp - 1] = false;
    }
    selectedOps[value] = true;
    console.log("Setting state");
    this.setState({
      selectedOps: selectedOps,
      selectedOp: i,
    });
  }

  getDivId(i, numberOrOp) {
    console.log("getDivId, numberOrOp=" + numberOrOp);
    const arrayValue = i - 1;
    const isSelected = (numberOrOp === GridChangePart.NUMBER) ? this.state.selectedNumbers[arrayValue] : this.state.selectedOps[arrayValue];
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
        <Numbers handleClick={(i) => this.handleNumberClick(i)} getDivId={(i, numberOrOp) => this.getDivId(i, numberOrOp)}/>
        <Operations handleClick={(i) => this.handleOperationClick(i)} getDivId={(i, numberOrOp) => this.getDivId(i, numberOrOp)}/>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
