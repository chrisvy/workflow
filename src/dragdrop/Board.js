import React, { Component } from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Square from './square';
import Knight from './Knight';
import BoardSquare from './BoardSquare';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: [0, 0]
    }
  }

  handleSquareClick = (x, y) => {
    this.setState({
      position: [x, y]
    });
  }

  // renderSquare = (i) => {
  //   // const tabIndex = this.props.tabIndex;
  //   const x = i % 8;
  //   const y = Math.floor(i / 8);
  //   const black = (x + y) % 2 === 1;

  //   const knightX = this.state.position[0];
  //   const knightY = this.state.position[1];
  //   const piece = (x === knightX && y === knightY) ? <Knight /> : null;
  //   return (
  //     <div key={i}
  //          style={{ width: '12.5%', height: '12.5%' }}>
  //       <Square handleSquareClick={() => this.handleSquareClick(x, y)}>
  //         {piece}
  //       </Square>
  //     </div>
  //   )
  // }

  renderPiece = (x, y) => {
    const knightX = this.state.position[0];
    const knightY = this.state.position[1];

    if (x === knightX && y === knightY) {
      return <Knight />;
    }
  }

  renderSquare = (i) => {
    const x = i % 8;
    const y = Math.floor(i / 8);

    return (
      <div key={i}
           style={{ width: '12.5%', height: '12.5%' }}>
        <BoardSquare x={x}
                     y={y}>
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    )
  }
  
  render() {
    var squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }
    return (
      <div style={{
        width: 300,
        height: 300,
        display: 'flex',
        flexWrap: 'wrap',
        margin: 10,
      }}>
        {squares}
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Board);