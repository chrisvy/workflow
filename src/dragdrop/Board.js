import React, { Component, PropTypes } from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import Square from './Square';
import BoardSquare from './BoardSquare';
import Knight from './Knight';

@DragDropContext(HTML5Backend)
class Board extends Component {
  static propTypes = {
    position: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      position: [0, 0]
    }
  }

  // handleChange = (x, y) => {
  //   this.setState({
  //     position: [x, y]
  //   });
  // }

  renderSquare = (i) => {
    // const tabIndex = this.props.tabIndex;
    const x = i % 8;
    const y = Math.floor(i / 8);

    const [knightX, knightY] = this.props.position;
    const piece = (x === knightX && y === knightY) ? <Knight /> : null;
    return (
      <div key={i}
           style={{ width: '12.5%', height: '12.5%' }}>
        {/*<Square handleSquareClick={() => this.handleSquareClick(x, y)}>
                  {piece}
                </Square>*/}
        <BoardSquare x={x}
                     y={y}>
          {piece}
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

export default Board;