import React, { Component } from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Square from './square';
import Knight from './Knight';

class EditArea extends Component {

  static defaultProps = {
    knightPosition: [0, 0]
  }

  constructor(props) {
    super(props);

    this.state = {
      showFlag: false
    }
  }

  renderSquare = (i) => {
    const tabIndex = this.props.tabIndex;
    const x = i % 8;
    const y = Math.floor(i / 8);
    const black = (x + y) % 2 === 1;

    const knightX = this.props.knightPosition[0];
    const knightY = this.props.knightPosition[1];
    const piece = (x === knightX && y === knightY) ?
      <Knight /> :
      null;
    return (
      <div key={tabIndex + '' + i}
           style={{ width: '12.5%', height: '12.5%' }}>
        <Square /*black={black}*/>
          {piece}
        </Square>
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

export default DragDropContext(HTML5Backend)(EditArea);