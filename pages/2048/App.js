/** @jsx jsx */;
import React, { Component } from 'react';
import {keyframes,ClassNames, css, jsx } from '@emotion/react'
import classNames from 'classnames';
const css_global=css`
    @keyframes down1 {
      from {
        transform: translate3d(0,0,0); }
      to {
        transform: translate3d(0,110px,0); } }
    @keyframes down2 {
      from {
        transform: translate3d(0,0,0); }
      to {
        transform: translate3d(0,220px,0); } }
    @keyframes down3 {
      from {
        transform: translate3d(0,0,0); }
      to {
        transform: translate3d(0,330px,0); } }        
    @keyframes down-1 {
      from {
        transform: translate3d(0,0,0); }
      to {
        transform: translate3d(0,-110px,0); } }
    @keyframes down-2 {
      from {
        transform: translate3d(0,0,0); }
      to {
        transform: translate3d(0,-220px,0); } }
    @keyframes down-3 {
      from {
        transform: translate3d(0,0,0); }
      to {
        transform: translate3d(0,-330px,0); } }  
    @keyframes right-1 {
      from {
        transform: translate3d(0,0,0); }
      to {
        transform: translate3d(-110px,0,0); } }
    @keyframes right-2 {
      from {
        transform: translate3d(0,0,0); }
      to {
        transform: translate3d(-220px,0,0); } }
    @keyframes right-3 {
      from {
        transform: translate3d(0,0,0); }
      to {
        transform: translate3d(-330px,0,0); } }      
    @keyframes right1 {
      from {
        transform: translate3d(0,0,0); }
      to {
        transform: translate3d(110px,0,0); } }
    @keyframes right2 {
      from {
        transform: translate3d(0,0,0); }
      to {
        transform: translate3d(220px,0,0); } }
    @keyframes right3 {
      from {
        transform: translate3d(0,0,0); }
      to {
        transform: translate3d(330px,0,0); } }  
@keyframes newTile {
  from {
            transform: scale(0); }

  to {
            transform: scale(1); } }
    `;
const style_board=css`  -ms-flex-order: 1;
      order: 1;
  width: 440px;
  height: 440px;
  padding: 5px;
  background-color: #baa;
  border-radius: 7px;
  outline: none;
  position: relative;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  cursor: default;`;
console.log(style_board);
const style_cell=css`-webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  cursor: default;
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
  background-color: #dcb;`;
  const style_tile=css`-webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  cursor: default;
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
  background-color: #dcb;
  position: absolute;
  `;

var rotateLeft = function(matrix) {
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

class Tile {
  static id = 0;
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

  moveTo = (row, column) => {
    this.oldRow = this.row;
    this.oldColumn = this.column;
    this.row = row;
    this.column = column;
  };

  isNew = () => {
    return this.oldRow == -1 && !this.mergedInto;
  };

  hasMoved = () => {
    return (
      (this.fromRow() != -1 &&
        (this.fromRow() != this.toRow() ||
          this.fromColumn() != this.toColumn())) ||
      this.mergedInto
    );
  };

  fromRow = () => {
    return this.mergedInto ? this.row : this.oldRow;
  };

  fromColumn = () => {
    return this.mergedInto ? this.column : this.oldColumn;
  };

  toRow = () => {
    return this.mergedInto ? this.mergedInto.row : this.row;
  };

  toColumn = () => {
    return this.mergedInto ? this.mergedInto.column : this.column;
  };
}
class Board {
  constructor() {
    this.tiles = [];
    this.cells = [];
    for (var i = 0; i < Board.size; ++i) {
      this.cells[i] = [
        this.addTile(),
        this.addTile(),
        this.addTile(),
        this.addTile(),
      ];
    }
    this.addRandomTile();
    this.setPositions();
    this.won = false;
  }

  addTile() {
    var res = new Tile(...arguments);
    this.tiles.push(res);
    return res;
  }

  static size = 4;

  moveLeft() {
    var hasChanged = false;
    for (var row = 0; row < Board.size; ++row) {
      var currentRow = this.cells[row].filter(tile => tile.value != 0);
      var resultRow = [];
      for (var target = 0; target < Board.size; ++target) {
        var targetTile = currentRow.length
          ? currentRow.shift()
          : this.addTile();
        if (currentRow.length > 0 && currentRow[0].value == targetTile.value) {
          var tile1 = targetTile;
          targetTile = this.addTile(targetTile.value);
          tile1.mergedInto = targetTile;
          var tile2 = currentRow.shift();
          tile2.mergedInto = targetTile;
          targetTile.value += tile2.value;
        }
        resultRow[target] = targetTile;
        this.won |= targetTile.value == 2048;
        hasChanged |= targetTile.value != this.cells[row][target].value;
      }
      this.cells[row] = resultRow;
    }
    return hasChanged;
  }

  setPositions() {
    this.cells.forEach((row, rowIndex) => {
      row.forEach((tile, columnIndex) => {
        tile.oldRow = tile.row;
        tile.oldColumn = tile.column;
        tile.row = rowIndex;
        tile.column = columnIndex;
        tile.markForDeletion = false;
      });
    });
  }

  static fourProbability = 0.1;

  addRandomTile() {
    var emptyCells = [];
    for (var r = 0; r < Board.size; ++r) {
      for (var c = 0; c < Board.size; ++c) {
        if (this.cells[r][c].value == 0) {
          emptyCells.push({ r: r, c: c });
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

  clearOldTiles() {
    this.tiles = this.tiles.filter(tile => tile.markForDeletion == false);
    this.tiles.forEach(tile => {
      tile.markForDeletion = true;
    });
  }

  hasWon() {
    return this.won;
  }

  static deltaX = [-1, 0, 1, 0];
  static deltaY = [0, -1, 0, 1];

  hasLost() {
    var canMove = false;
    for (var row = 0; row < Board.size; ++row) {
      for (var column = 0; column < Board.size; ++column) {
        canMove |= this.cells[row][column].value == 0;
        for (var dir = 0; dir < 4; ++dir) {
          var newRow = row + Board.deltaX[dir];
          var newColumn = column + Board.deltaY[dir];
          if (
            newRow < 0 ||
            newRow >= Board.size ||
            newColumn < 0 ||
            newColumn >= Board.size
          ) {
            continue;
          }
          canMove |=
            this.cells[row][column].value ==
            this.cells[newRow][newColumn].value;
        }
      }
    }
    return !canMove;
  }
}

export default function BoardView(props){
  const [state,setState]=React.useState({board:new Board()});
  let startX,startY;
  const restartGame=()=>{
    setState({ board: new Board() });
  }
  const handleKeyDown=(event)=>{
    // console.log(event)
    if (state.board.hasWon()) {
      return;
    }
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      event.preventDefault();
      var direction = event.keyCode - 37;
      setState({ board: state.board.move(direction) });
    }
  }
  const handleTouchStart=(event) =>{
    if (state.board.hasWon()) {
      return;
    }
    if (event.touches.length != 1) {
      return;
    }
    startX = event.touches[0].screenX;
    startY = event.touches[0].screenY;
    event.preventDefault();
  }
  const handleTouchEnd=(event)=>{
    if (state.board.hasWon()) {
      return;
    }
    if (event.changedTouches.length != 1) {
      return;
    }
    var deltaX = event.changedTouches[0].screenX - startX;
    var deltaY = event.changedTouches[0].screenY - startY;
    var direction = -1;
    if (Math.abs(deltaX) > 3 * Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      direction = deltaX > 0 ? 2 : 0;
    } else if (
      Math.abs(deltaY) > 3 * Math.abs(deltaX) &&
      Math.abs(deltaY) > 30
    ) {
      direction = deltaY > 0 ? 3 : 1;
    }
    if (direction != -1) {
      setState({ board: state.board.move(direction) });
    }
  }
  React.useEffect(()=>{
    window.addEventListener('keydown', handleKeyDown);
    return(()=>{
      window.removeEventListener('keydown', handleKeyDown);  
    });
  },[]);
    console.log("render==============")
    var cells = state.board.cells.map((row, rowIndex) => {
      return (
        <div key={rowIndex}>
          {row.map((_, columnIndex) => (
            <Cell key={rowIndex * Board.size + columnIndex} />
          ))}
        </div>
      );
    });
    var tiles = state.board.tiles
      .filter(tile => tile.value != 0)
      .map(tile => <TileView tile={tile} key={tile.id} />);
    return (
      <div css={css_global} >
      <div
        css={style_board}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        tabIndex="1"
      >
        {
          cells
        }
        {tiles}
        <GameEndOverlay
          board={state.board}
          onRestart={restartGame}
        />
      </div>
      </div>
    );
  }

function Cell(props){
    return <span css={style_cell}>{''}</span>;
}

function TileView(props){
  // shouldComponentUpdate(nextProps) {
  //   if (this.props.tile != nextProps.tile) {
  //     return true;
  //   }
  //   if (!nextProps.tile.hasMoved() && !nextProps.tile.isNew()) {
  //     return false;
  //   }
  //   return true;
  // }
    var tile = props.tile;
    let style_tile2;
    switch(tile.value){
      case 0:
        style_tile2={backgroundColor: "#dcb"}
        break;
      case 2:
        style_tile2={backgroundColor: "#eee"}
        break;
      case 4:
        style_tile2={backgroundColor: "#eec"}
        break;
      case 8:
        style_tile2={backgroundColor: "#fb8",color:"#ffe"}
        break;
      case 16:
        style_tile2={backgroundColor: "#f96",color:"#ffe"}
        break;
      case 32:
        style_tile2={backgroundColor: "#f75",color:"#ffe"}
        break;
      case 64:
        style_tile2={backgroundColor: "#f53",color:"#ffe"}
        break;
      case 128:
        style_tile2={backgroundColor: "#ec7",color:"#ffe",fontSize:45}
        break;
      case 256:
        style_tile2={backgroundColor: "#ec6",color:"#ffe",fontSize:45}
        break;
      case 512:
        style_tile2={backgroundColor: "#ec5",color:"#ffe",fontSize:45}
        break;
      case 1024:
        style_tile2={backgroundColor: "#ec3",color:"#fff",fontSize:35}
        break;
      case 2048:
        style_tile2={backgroundColor: "#ec2",color:"#fff",fontSize:35}
        break;
    }
    // classArray.push('tile' + this.props.tile.value);
    // let style_pos;
    console.log("row,column",tile.row,tile.column)
    if (!tile.mergedInto) {
      // classArray.push('position_' + tile.row + '_' + tile.column);
      console.log("not mergedInto")
      style_tile2.top=tile.row*110+5
      style_tile2.left=tile.column*110+5
    }
    else{
      style_tile2.display="none"
    }
    if (tile.isNew()) {
      // classArray.push('new');
      // style_tile2["WebkitAnimationDuration"]="0.2s"
      style_tile2["animationDuration"]="0.2s"
      // style_tile2["WebkitAnimationName"]="newTile"
      style_tile2["animationName"]="newTile"
      // style_tile2["-webkit-animation-fill-mode"]="forwards"
      style_tile2["animationFillMode"]="forwards"
      // style_tile2["WebkitAnimationDelay"]="0.15s"
      style_tile2["animationDelay"]="0.15s"
      // style_tile2["-webkit-transform"]="scale(0)"
      style_tile2["transform"]="scale(0)"
    }
      if (tile.hasMoved()) {
        console.log("hasMoved")
        let rmove=tile.toRow()-tile.fromRow()
        if (rmove!==0){
          style_tile2["animationDuration"]="0.2s"
          // style_tile2["WebkitAnimationName"]="newTile"
          style_tile2["animationName"]="down"+rmove
          // style_tile2["-webkit-animation-fill-mode"]="forwards"
          style_tile2["animationFillMode"]="forwards"
        }
        let cmove=tile.toColumn()-tile.fromColumn()
        if (cmove!==0){
          style_tile2["animationDuration"]="0.2s"
          // style_tile2["WebkitAnimationName"]="newTile"
          style_tile2["animationName"]="right"+cmove
          // style_tile2["-webkit-animation-fill-mode"]="forwards"
          style_tile2["animationFillMode"]="forwards"
        }
        style_tile2["display"]="inline"
        style_tile2.top=tile.fromRow()*110+5
        style_tile2.left=tile.fromColumn()*110+5
        console.log("move",rmove,cmove);
      }
    console.log(style_tile2)
    return <span css={style_tile} style={style_tile2} >{tile.value}</span>;
    //className={classes}
}

var GameEndOverlay = ({ board, onRestart }) => {
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
    <div className="overlay">
      <p className="message">{contents}</p>
      <button className="tryAgain" onClick={onRestart} onTouchEnd={onRestart}>
        Try again
      </button>
    </div>
  );
};
