import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//An enum for the part of the grid changer, i.e. either numbers or operations
var GridChangePart = Object.freeze({"NUMBER":1, "OPERATION":2});

//An enum for the various operation types
var OpType = Object.freeze({"NONE":-1, "ADD":1, "SUBTRACT":2, "MULTIPLY":3, "DIVIDE":4});

//An enum for telling whether we're dealing with a row or a column
var RowOrCol = Object.freeze({"ROW": 1, "COLUMN": 2});

//The array index values for each row and column. I.e. we have a 9 value array representing a 3x3 grid, row 1 is
//index 0, 1 and 2, column 1 is index 0, 3, 6, and so on.
var RowIndexes = Object.freeze({1: [0, 1, 2], 2: [3, 4, 5], 3: [6, 7, 8]})
var ColIndexes = Object.freeze({1: [0, 3, 6], 2: [1, 4, 7], 3: [2, 5, 8]})

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

  renderButton(rowOrCol, number, props) {
    const buttonValue = (rowOrCol === RowOrCol.COLUMN) ? "v" : ">";
    return (
      <div
        id="gameclickable"
        onClick={() => {props.handleClick(rowOrCol, number);}}>
        {buttonValue}
      </div>
    );
  }

  renderGridSquare(props, i) {
    return (
      <div>
        {props.gridValues[i]}
      </div>
    );
  }
  render() {
    return (
      <div className="game-grid">
        <div id="emptygrid"> </div>
        {this.renderButton(RowOrCol.COLUMN, 1, this.props)}
        {this.renderButton(RowOrCol.COLUMN, 2, this.props)}
        {this.renderButton(RowOrCol.COLUMN, 3, this.props)}
        {this.renderButton(RowOrCol.ROW, 1, this.props)}
        {this.renderGridSquare(this.props, 0)}
        {this.renderGridSquare(this.props, 1)}
        {this.renderGridSquare(this.props, 2)}
        {this.renderButton(RowOrCol.ROW, 2, this.props)}
        {this.renderGridSquare(this.props, 3)}
        {this.renderGridSquare(this.props, 4)}
        {this.renderGridSquare(this.props, 5)}
        {this.renderButton(RowOrCol.ROW, 3, this.props)}
        {this.renderGridSquare(this.props, 6)}
        {this.renderGridSquare(this.props, 7)}
        {this.renderGridSquare(this.props, 8)}
    </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridValues: [1, 1, 6, 5, 5, 30, 9, 9, 14],
      selectedNumbers: Array(10).fill(false),
      selectedNumber: -1,
      selectedOps: Array(4).fill(false),
      selectedOp: OpType.NONE,
      moves: 0,
      won: false
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

  handleGridButtonClick(rowOrCol, number) {
    console.log("rowOrCol=" + rowOrCol + ", number=" + number);
    const selectedNumber = this.state.selectedNumber;
    if (selectedNumber === -1) {
      console.log("No number selected");
      return;
    }
    const selectedOp = this.state.selectedOp;
    if (selectedOp === OpType.NONE) {
      console.log("No operation selected");
      return;
    }
    if (this.state.won) {
      console.log("Not making move, game already won");
      return;
    }
    const gridValues = this.state.gridValues.slice();
    let indexesToChange = (rowOrCol === RowOrCol.ROW) ? RowIndexes[number] : ColIndexes[number];
    this.applyGridChangeToGrid(gridValues, selectedNumber, selectedOp, indexesToChange);
  }

  applyGridChangeToGrid(gridValues, selectedNumber, selectedOp, indexesToChange) {
    for (var i = 0; i < indexesToChange.length; i++) {
      const index = indexesToChange[i];
      let newValue = gridValues[index];
      switch(selectedOp) {
        case OpType.ADD:
          newValue = +gridValues[index] + +selectedNumber;
          break;
        case OpType.SUBTRACT:
          newValue = +gridValues[index] - +selectedNumber;
          break;
        case OpType.MULTIPLY:
          newValue = +gridValues[index] * +selectedNumber;
          break;
        case OpType.DIVIDE:
          if ((gridValues[index] % +selectedNumber) === 0) {
            newValue = +gridValues[index] / +selectedNumber;
          }
          break;
        default:
          console.log("No operation selected");
      }
      console.log("New value= " + newValue);
      gridValues[index] = newValue;
    }
    const newMoves = this.state.moves + 1;
    console.log("Number of moves now=" + newMoves);
    this.setState({
      gridValues: gridValues,
      moves: newMoves
    });
    this.checkForWinner(gridValues);
  }

  checkForWinner(gridValues) {
    let firstVal = gridValues[0];
    for (var i = 1; i < gridValues.length; i++) {
      let nextVal = gridValues[i];
      if (firstVal !== nextVal) {
        return;
      }
    }
    //If we've got to this point without returning, we must have won the game
    console.log("Game won!");
    this.setState({
      won: true
    });
  }

  getGameStatus() {
    if (this.state.won) {
      return (
        <p>WINNER! {this.state.moves} moves</p>
      );
    } else {
      return (
        <p>Moves: {this.state.moves}</p>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Ruboku</h1>
        {this.getGameStatus()}
        <div className="undo-button">Undo Last Move</div>
        <Grid handleClick={(rowOrCol, number) => this.handleGridButtonClick(rowOrCol, number)} gridValues={this.state.gridValues}/>
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
