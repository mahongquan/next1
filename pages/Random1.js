import React from 'react';
function addRandomTile() {
    var newValue = Math.random()
    return newValue;
}
function ReadMore() {
  return (
    <div>
      {addRandomTile()}
    </div>
  );
}

export default ReadMore;
