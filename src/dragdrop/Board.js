import React, { Component, PropTypes } from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from './Constants';
import BoardSquare from './BoardSquare';
import { One, Two } from './DragElements';

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
      topEles: {},//该对象记录每个拖拽元素的(元素：已添加个数)键值对
      boxElesPos: {},
      boxPosEles: {}//该对象记录拖进方框中的元素的(位置：元素id)键值对，其中，用'元素名+个数'表示'元素id'
    };
  }
  
  handleDragAdd = (topEle) => {
    this.setState({
      dragState: 'adding',
      dragEle: topEle
    });
  }

  handleDragMove = (boxEle) => {
    this.setState({
      dragState: 'moving',
      dragEle: boxEle
    });
  }

  handleDrop = (ele, x, y) => {
    if (this.state.dragState === 'adding') {//ele: 'ha'
      const topEleInfo = this.state.topEles[ele];
      const topEleNum = topEleInfo ? topEleInfo.num+1 : 0;
      const topEleIds = topEleInfo ? topEleInfo.eles.push(ele+'-'+topEleInfo.num) : [ele+'-0'];
      this.setState({
        topEles: {
          ...this.state.topEles,
          [ele]: {
            num: topEleNum,//记录个数
            eles: topEleIds//拖入编辑区的节点id
          }
        },
        boxElesPos: {
          ...this.state.boxElesPos,
          [ele+'-'+topEleNum]: [x, y],
        },
        boxPosEles: {
          ...this.state.boxPosEles,
          [x+'-'+y]: ele+'-'+topEleNum
        },
        dragState: 'drop'
      });
    } else if (this.state.dragState === 'moving') {
      const eleArr = ele.split('-');//ele: 'ha-15'
      const eleSource = eleArr[0];
      const topEleInfo = this.state.topEles[eleSource];
      const boxPosEles = this.state.boxPosEles;
      const boxElesPos = this.state.boxElesPos;
      const oldPos = boxElesPos[ele];
      let newBoxPosEles = {};
      for(let inEle in boxPosEles) {
        if (inEle === oldPos) {
          newBoxPosEles[x+'-'+y] = ele;
        } else {
          newBoxPosEles[inEle] = boxPosEles[inEle];
        }
      }
      this.setState({
        boxElesPos: {
          ...this.state.boxElesPos,
          [ele]: [x, y],
        },
        boxPosEles: newBoxPosEles,
        dragState: 'drop'
      });
    }
  }

  renderSquare = (i) => {
    const x = i % 8;
    const y = Math.floor(i / 8);

    const [knightX, knightY] = this.props.position;
    return (
      <div key={i}
           style={{ width: '12.5%', height: '12.5%' }}>
        <BoardSquare x={x} y={y} ele={this.boxPosEles[x+'-'+y]} handleDrop={this.handleDrop} handleDragMove={this.handleDragMove} />
      </div>
    )
  }
  
  render() {
    var squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }
    return (
      <div>
        <One title="true" lastDroppedText="he" handleDrag={this.handleDragAdd} />
        <One title="true" lastDroppedText="ha" handleDrag={this.handleDragAdd} />
        <div style={{
          width: 300,
          height: 300,
          display: 'flex',
          flexWrap: 'wrap',
          margin: 10,
          border: '1px solid gray'
        }}>
          {squares}
        </div>
      </div>
    )
  }
}

export default Board;