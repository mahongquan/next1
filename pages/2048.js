import React from 'react';
var rotateLeft = function (matrix) {
  var rows = matrix.length;
  var columns = matrix[0].length;
  var res = [];
  for (var row = 0; row < rows; ++row) {
    res.push([]);
    for (var column = 0; column < columns; ++column) {
      res[row][column] = matrix[column][columns - row - 1];
    }
  }
  return res;
};
class Tile{
  static id=0
  constructor(value, row, column) {
    this.value = value || 0;
    this.row = row || -1;
    this.column = column || -1;
    this.oldRow = -1;
    this.oldColumn = -1;
    this.markForDeletion = false;
    this.mergedInto = null;
    this.id = Tile.id++;
  }



  moveTo = (row, column)=> {
    this.oldRow = this.row;
    this.oldColumn = this.column;
    this.row = row;
    this.column = column;
  }

  isNew = ()=> {
    return this.oldRow == -1 && !this.mergedInto;
  }

  hasMoved =  ()=> {
    return (this.fromRow() != -1 && (this.fromRow() != this.toRow() || this.fromColumn() != this.toColumn())) ||
      this.mergedInto;
  }

  fromRow = ()=> {
    return this.mergedInto ? this.row : this.oldRow;
  }

  fromColumn =  ()=> {
    return this.mergedInto ? this.column : this.oldColumn;
  }

  toRow = ()=> {
    return this.mergedInto ? this.mergedInto.row : this.row;
  }

  toColumn =  ()=> {
    return this.mergedInto ? this.mergedInto.column : this.column;
  }
}
class Board {
  static size = 4;
  static fourProbability = 0.1;
  static deltaX = [-1, 0, 1, 0];
  static deltaY = [0, -1, 0, 1];
  constructor () {
    this.tiles = [];
    this.cells = [];
    for (var i = 0; i < Board.size; ++i) {
      this.cells[i] = [this.addTile(), this.addTile(), this.addTile(), this.addTile()];
    }
    this.addRandomTile();
    this.setPositions();
    this.won = false;
  }

  addTile(value, row, column) {
    var res = new Tile(value, row, column);
    //Tile.apply(res, arguments);
    this.tiles.push(res);
    return res;
  }

  moveLeft() {
    var hasChanged = false;
    for (var row = 0; row < Board.size; ++row) {
      var currentRow = this.cells[row].filter(tile => tile.value != 0);
      var resultRow = [];
      for (var target = 0; target < Board.size; ++target) {
        var targetTile = currentRow.length ? currentRow.shift() : this.addTile();
        if (currentRow.length > 0 && currentRow[0].value == targetTile.value) {
          var tile1 = targetTile;
          targetTile = this.addTile(targetTile.value);
          tile1.mergedInto = targetTile;
          var tile2 = currentRow.shift();
          tile2.mergedInto = targetTile;
          targetTile.value += tile2.value;
        }
        resultRow[target] = targetTile;
        this.won |= (targetTile.value == 2048);
        hasChanged |= (targetTile.value != this.cells[row][target].value);
      }
      this.cells[row] = resultRow;
    }
    return hasChanged;
  }

  setPositions () {
    this.cells.forEach((row, rowIndex) => {
      row.forEach((tile, columnIndex) => {
        tile.oldRow = tile.row;
        tile.oldColumn = tile.column;
        tile.row = rowIndex;
        tile.column = columnIndex;
        tile.markForDeletion = false;
      });
    });
  };


  addRandomTile () {
    var emptyCells = [];
    for (var r = 0; r < Board.size; ++r) {
      for (var c = 0; c < Board.size; ++c) {
        if (this.cells[r][c].value == 0) {
          emptyCells.push({r: r, c: c});
        }
      }
    }
    var index = ~~(Math.random() * emptyCells.length);
    var cell = emptyCells[index];
    var newValue = Math.random() < Board.fourProbability ? 4 : 2;
    this.cells[cell.r][cell.c] = this.addTile(newValue);
  }

  move(direction) {
    // 0 -> left, 1 -> up, 2 -> right, 3 -> down
    this.clearOldTiles();
    for (var i = 0; i < direction; ++i) {
      this.cells = rotateLeft(this.cells);
    }
    var hasChanged = this.moveLeft();
    for (var i = direction; i < 4; ++i) {
      this.cells = rotateLeft(this.cells);
    }
    if (hasChanged) {
      this.addRandomTile();
    }
    this.setPositions();
    return this;
  }

  clearOldTiles () {
    this.tiles = this.tiles.filter(tile => tile.markForDeletion == false);
    this.tiles.forEach(tile => { tile.markForDeletion = true; });
  }

  hasWon  () {
    return this.won;
  }



  hasLost  () {
    var canMove = false;
    for (var row = 0; row < Board.size; ++row) {
      for (var column = 0; column < Board.size; ++column) {
        canMove |= (this.cells[row][column].value == 0);
        for (var dir = 0; dir < 4; ++dir) {
          var newRow = row + Board.deltaX[dir];
          var newColumn = column + Board.deltaY[dir];
          if (newRow < 0 || newRow >= Board.size || newColumn < 0 || newColumn >= Board.size) {
            continue;
          }
          canMove |= (this.cells[row][column].value == this.cells[newRow][newColumn].value);
        }
      }
    }
    return !canMove;
  }
}
class Cell extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <span className='cell'>{''}</span>
    );
  }
}

class TileView extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.tile != nextProps.tile) {
      return true;
    }
    if (!nextProps.tile.hasMoved() && !nextProps.tile.isNew()) {
      return false;
    }
    return true;
  }
  render() {
    var tile = this.props.tile;
    var classArray = ['tile'];
    classArray.push('tile' + this.props.tile.value);
    if (!tile.mergedInto) {
      classArray.push('position_' + tile.row + '_' + tile.column);
    }
    if (tile.mergedInto) {
      classArray.push('merged');
    }
    if (tile.isNew()) {
      classArray.push('new');
    }
    if (tile.hasMoved()) {
      classArray.push('row_from_' + tile.fromRow() + '_to_' + tile.toRow());
      classArray.push('column_from_' + tile.fromColumn() + '_to_' + tile.toColumn());
      classArray.push('isMoving');
    }
    var classes = classArray.join(' ');
    console.log("gen class============");
    console.log(tile);
    console.log(classes)
    return (
      <span className={classes}>{tile.value}</span>
    );
  }
}

var GameEndOverlay = ({board, onRestart}) => {
  var contents = '';
  if (board.hasWon()) {
    contents = 'Good Job!';
  } else if (board.hasLost()) {
    contents = 'Game Over';
  }
  if (!contents) {
    return null;
  }
  return (
    <div className='overlay'>
      <p className='message'>{contents}</p>
      <button className="tryAgain" onClick={onRestart} onTouchEnd={onRestart}>Try again</button>
    </div>
  );
};
class BoardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {board: new Board};
  }
  restartGame() {
    this.setState({board: new Board});
  }
  handleKeyDown(event) {
    if (this.state.board.hasWon()) {
      return;
    }
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      event.preventDefault();
      var direction = event.keyCode - 37;
      this.setState({board: this.state.board.move(direction)});
    }
  }
  handleTouchStart(event) {
    if (this.state.board.hasWon()) {
      return;
    }
    if (event.touches.length != 1) {
      return;
    }
    this.startX = event.touches[0].screenX;
    this.startY = event.touches[0].screenY;
    event.preventDefault();
  }
  handleTouchEnd(event) {
    if (this.state.board.hasWon()) {
      return;
    }
    if (event.changedTouches.length != 1) {
      return;
    }
    var deltaX = event.changedTouches[0].screenX - this.startX;
    var deltaY = event.changedTouches[0].screenY - this.startY;
    var direction = -1;
    if (Math.abs(deltaX) > 3 * Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      direction = deltaX > 0 ? 2 : 0;
    } else if (Math.abs(deltaY) > 3 * Math.abs(deltaX) && Math.abs(deltaY) > 30) {
      direction = deltaY > 0 ? 3 : 1;
    }
    if (direction != -1) {
      this.setState({board: this.state.board.move(direction)});
    }
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }
  bclick=()=>{
    console.log("click");
  }
  render() {
    var cells = this.state.board.cells.map((row, rowIndex) => {
      return (
        <div key={rowIndex}>
          { row.map((_, columnIndex) => <Cell key={rowIndex * Board.size + columnIndex} />) }
        </div>
      );
    });
    let tiles;
    console.log(this.state);
    tiles = this.state.board.tiles
      .filter(tile => tile.value != 0)
      .map(tile => <TileView tile={tile} key={tile.id} />);
    return (
    <div>
      <style jsx global>
        {`
        body {
          display: -ms-flexbox;
          display: flex;
          -ms-flex-direction: column;
              flex-direction: column;
          -ms-flex-pack: center;
              justify-content: center;
          -ms-flex-line-pack: center;
              align-content: center;
          -ms-flex-align: center;
              align-items: center;
          font-family: "Clear Sans", sans-serif;
          font-size: 21px; }

        .text {
          -ms-flex-order: 2;
              order: 2;
          padding-top: 40px;
          width: 440px;
          font-weight: bold; }

        .board {
          -ms-flex-order: 1;
              order: 1;
          width: 440px;
          height: 440px;
          padding: 5px;
          background-color: #baa;
          border-radius: 7px;
          outline: none;
          position: relative; }

        .board .cell, .tile {
          -webkit-user-select: none;
             -moz-user-select: none;
              -ms-user-select: none;
                  user-select: none;
          cursor: default; }

        .cell, .tile {
          width: 100px;
          height: 100px;
          margin: 5px;
          line-height: 90px;
          display: inline-block;
          font-size: 55px;
          font-weight: bold;
          text-align: center;
          vertical-align: middle;
          border-radius: 7px;
          font-family: "Clear Sans";
          color: #766;
          background-color: #dcb; }

        .tile0 {
          background-color: #dcb; }

        .tile2 {
          background-color: #eee; }

        .tile4 {
          background-color: #eec; }

        .tile8 {
          color: #ffe;
          background-color: #fb8; }

        .tile16 {
          color: #ffe;
          background-color: #f96; }

        .tile32 {
          color: #ffe;
          background-color: #f75; }

        .tile64 {
          color: #ffe;
          background-color: #f53; }

        .tile128 {
          color: #ffe;
          background-color: #ec7;
          font-size: 45px; }

        .tile256 {
          color: #ffe;
          background-color: #ec6;
          font-size: 45px; }

        .tile512 {
          color: #ffe;
          background-color: #ec5;
          font-size: 45px; }

        .tile1024 {
          color: #fff;
          background-color: #ec3;
          font-size: 35px; }

        .tile2048 {
          color: #fff;
          background-color: #ec2;
          font-size: 35px; }

        .tile {
          position: absolute; }

        .tile.merged {
          display: none; }

        .tile.merged.isMoving {
          display: inline; }

        .tile.new, .overlay {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: newTile;
                  animation-name: newTile;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards;
          -webkit-animation-delay: 0.15s;
                  animation-delay: 0.15s;
          -webkit-transform: scale(0);
                  transform: scale(0); }

        @-webkit-keyframes newTile {
          from {
            -webkit-transform: scale(0);
                    transform: scale(0); }

          to {
            -webkit-transform: scale(1);
                    transform: scale(1); } }

        @keyframes newTile {
          from {
            -webkit-transform: scale(0);
                    transform: scale(0); }

          to {
            -webkit-transform: scale(1);
                    transform: scale(1); } }

        .overlay {
          position: absolute;
          top: 0px;
          bottom: 0px;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-direction: column;
              flex-direction: column;
          -ms-flex-align: center;
              align-items: center;
          -ms-flex-pack: center;
              justify-content: center;
          text-align: center;
          left: 0px;
          right: 0px;
          font-size: 55px;
          font-weight: bolder;
          background-color: rgba(221, 221, 221, 0.5);
          border-radius: 7px; }

        .tryAgain {
          background-color: #876;
          color: #fff;
          height: 40px;
          width: 200px;
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          border: none;
          border-radius: 5px; }

        .overlay .message {
          color: #666; }
        .position_0_0:not(.isMoving) {
          top: 5;
          left: 5; }

        .position_0_1:not(.isMoving) {
          top: 5;
          left: 115; }

        .position_0_2:not(.isMoving) {
          top: 5;
          left: 225; }

        .position_0_3:not(.isMoving) {
          top: 5;
          left: 335; }

        .position_1_0:not(.isMoving) {
          top: 115;
          left: 5; }

        .position_1_1:not(.isMoving) {
          top: 115;
          left: 115; }

        .position_1_2:not(.isMoving) {
          top: 115;
          left: 225; }

        .position_1_3:not(.isMoving) {
          top: 115;
          left: 335; }

        .position_2_0:not(.isMoving) {
          top: 225;
          left: 5; }

        .position_2_1:not(.isMoving) {
          top: 225;
          left: 115; }

        .position_2_2:not(.isMoving) {
          top: 225;
          left: 225; }

        .position_2_3:not(.isMoving) {
          top: 225;
          left: 335; }

        .position_3_0:not(.isMoving) {
          top: 335;
          left: 5; }

        .position_3_1:not(.isMoving) {
          top: 335;
          left: 115; }

        .position_3_2:not(.isMoving) {
          top: 335;
          left: 225; }

        .position_3_3:not(.isMoving) {
          top: 335;
          left: 335; }

        .row_from_0_to_0 {
          top: 5; }

        .row_from_0_to_1 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: row_from_0_to_1;
                  animation-name: row_from_0_to_1;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes row_from_0_to_1 {
          from {
            top: 5; }

          to {
            top: 115; } }

        @keyframes row_from_0_to_1 {
          from {
            top: 5; }

          to {
            top: 115; } }

        .row_from_0_to_2 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: row_from_0_to_2;
                  animation-name: row_from_0_to_2;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes row_from_0_to_2 {
          from {
            top: 5; }

          to {
            top: 225; } }

        @keyframes row_from_0_to_2 {
          from {
            top: 5; }

          to {
            top: 225; } }

        .row_from_0_to_3 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: row_from_0_to_3;
                  animation-name: row_from_0_to_3;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes row_from_0_to_3 {
          from {
            top: 5; }

          to {
            top: 335; } }

        @keyframes row_from_0_to_3 {
          from {
            top: 5; }

          to {
            top: 335; } }

        .row_from_1_to_0 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: row_from_1_to_0;
                  animation-name: row_from_1_to_0;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes row_from_1_to_0 {
          from {
            top: 115; }

          to {
            top: 5; } }

        @keyframes row_from_1_to_0 {
          from {
            top: 115; }

          to {
            top: 5; } }

        .row_from_1_to_1 {
          top: 115; }

        .row_from_1_to_2 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: row_from_1_to_2;
                  animation-name: row_from_1_to_2;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes row_from_1_to_2 {
          from {
            top: 115; }

          to {
            top: 225; } }

        @keyframes row_from_1_to_2 {
          from {
            top: 115; }

          to {
            top: 225; } }

        .row_from_1_to_3 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: row_from_1_to_3;
                  animation-name: row_from_1_to_3;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes row_from_1_to_3 {
          from {
            top: 115; }

          to {
            top: 335; } }

        @keyframes row_from_1_to_3 {
          from {
            top: 115; }

          to {
            top: 335; } }

        .row_from_2_to_0 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: row_from_2_to_0;
                  animation-name: row_from_2_to_0;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes row_from_2_to_0 {
          from {
            top: 225; }

          to {
            top: 5; } }

        @keyframes row_from_2_to_0 {
          from {
            top: 225; }

          to {
            top: 5; } }

        .row_from_2_to_1 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: row_from_2_to_1;
                  animation-name: row_from_2_to_1;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes row_from_2_to_1 {
          from {
            top: 225; }

          to {
            top: 115; } }

        @keyframes row_from_2_to_1 {
          from {
            top: 225; }

          to {
            top: 115; } }

        .row_from_2_to_2 {
          top: 225; }

        .row_from_2_to_3 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: row_from_2_to_3;
                  animation-name: row_from_2_to_3;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes row_from_2_to_3 {
          from {
            top: 225; }

          to {
            top: 335; } }

        @keyframes row_from_2_to_3 {
          from {
            top: 225; }

          to {
            top: 335; } }

        .row_from_3_to_0 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: row_from_3_to_0;
                  animation-name: row_from_3_to_0;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes row_from_3_to_0 {
          from {
            top: 335; }

          to {
            top: 5; } }

        @keyframes row_from_3_to_0 {
          from {
            top: 335; }

          to {
            top: 5; } }

        .row_from_3_to_1 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: row_from_3_to_1;
                  animation-name: row_from_3_to_1;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes row_from_3_to_1 {
          from {
            top: 335; }

          to {
            top: 115; } }

        @keyframes row_from_3_to_1 {
          from {
            top: 335; }

          to {
            top: 115; } }

        .row_from_3_to_2 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: row_from_3_to_2;
                  animation-name: row_from_3_to_2;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes row_from_3_to_2 {
          from {
            top: 335; }

          to {
            top: 225; } }

        @keyframes row_from_3_to_2 {
          from {
            top: 335; }

          to {
            top: 225; } }

        .row_from_3_to_3 {
          top: 335; }

        .column_from_0_to_0 {
          left: 5; }

        .column_from_0_to_1 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: column_from_0_to_1;
                  animation-name: column_from_0_to_1;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes column_from_0_to_1 {
          from {
            left: 5; }

          to {
            left: 115; } }

        @keyframes column_from_0_to_1 {
          from {
            left: 5; }

          to {
            left: 115; } }

        .column_from_0_to_2 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: column_from_0_to_2;
                  animation-name: column_from_0_to_2;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes column_from_0_to_2 {
          from {
            left: 5; }

          to {
            left: 225; } }

        @keyframes column_from_0_to_2 {
          from {
            left: 5; }

          to {
            left: 225; } }

        .column_from_0_to_3 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: column_from_0_to_3;
                  animation-name: column_from_0_to_3;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes column_from_0_to_3 {
          from {
            left: 5; }

          to {
            left: 335; } }

        @keyframes column_from_0_to_3 {
          from {
            left: 5; }

          to {
            left: 335; } }

        .column_from_1_to_0 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: column_from_1_to_0;
                  animation-name: column_from_1_to_0;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes column_from_1_to_0 {
          from {
            left: 115; }

          to {
            left: 5; } }

        @keyframes column_from_1_to_0 {
          from {
            left: 115; }

          to {
            left: 5; } }

        .column_from_1_to_1 {
          left: 115; }

        .column_from_1_to_2 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: column_from_1_to_2;
                  animation-name: column_from_1_to_2;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes column_from_1_to_2 {
          from {
            left: 115; }

          to {
            left: 225; } }

        @keyframes column_from_1_to_2 {
          from {
            left: 115; }

          to {
            left: 225; } }

        .column_from_1_to_3 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: column_from_1_to_3;
                  animation-name: column_from_1_to_3;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes column_from_1_to_3 {
          from {
            left: 115; }

          to {
            left: 335; } }

        @keyframes column_from_1_to_3 {
          from {
            left: 115; }

          to {
            left: 335; } }

        .column_from_2_to_0 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: column_from_2_to_0;
                  animation-name: column_from_2_to_0;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes column_from_2_to_0 {
          from {
            left: 225; }

          to {
            left: 5; } }

        @keyframes column_from_2_to_0 {
          from {
            left: 225; }

          to {
            left: 5; } }

        .column_from_2_to_1 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: column_from_2_to_1;
                  animation-name: column_from_2_to_1;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes column_from_2_to_1 {
          from {
            left: 225; }

          to {
            left: 115; } }

        @keyframes column_from_2_to_1 {
          from {
            left: 225; }

          to {
            left: 115; } }

        .column_from_2_to_2 {
          left: 225; }

        .column_from_2_to_3 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: column_from_2_to_3;
                  animation-name: column_from_2_to_3;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes column_from_2_to_3 {
          from {
            left: 225; }

          to {
            left: 335; } }

        @keyframes column_from_2_to_3 {
          from {
            left: 225; }

          to {
            left: 335; } }

        .column_from_3_to_0 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: column_from_3_to_0;
                  animation-name: column_from_3_to_0;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes column_from_3_to_0 {
          from {
            left: 335; }

          to {
            left: 5; } }

        @keyframes column_from_3_to_0 {
          from {
            left: 335; }

          to {
            left: 5; } }

        .column_from_3_to_1 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: column_from_3_to_1;
                  animation-name: column_from_3_to_1;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes column_from_3_to_1 {
          from {
            left: 335; }

          to {
            left: 115; } }

        @keyframes column_from_3_to_1 {
          from {
            left: 335; }

          to {
            left: 115; } }

        .column_from_3_to_2 {
          -webkit-animation-duration: 0.2s;
                  animation-duration: 0.2s;
          -webkit-animation-name: column_from_3_to_2;
                  animation-name: column_from_3_to_2;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards; }

        @-webkit-keyframes column_from_3_to_2 {
          from {
            left: 335; }

          to {
            left: 225; } }

        @keyframes column_from_3_to_2 {
          from {
            left: 335; }

          to {
            left: 225; } }

        .column_from_3_to_3 {
          left: 335; }
        `}
      </style>
      <button onClick={this.bclick}>play</button>
      <div className='board' onTouchStart={this.handleTouchStart.bind(this)} onTouchEnd={this.handleTouchEnd.bind(this)} tabIndex="1">
        {cells}
        {tiles}
        <GameEndOverlay board={this.state.board} onRestart={this.restartGame.bind(this)} />
      </div>
    </div>
    );
  }
};
export default BoardView