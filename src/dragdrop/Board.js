import React, { Component, PropTypes } from 'react';
import { Tabs } from 'yo-component';
import 'yo-component/dist/antd.css';
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
    const pos =x+'-'+y;
    if (this.state.dragState === 'adding') {//ele: 'ha'
      const topEleInfo = this.state.topEles[ele];
      const topEleNum = topEleInfo ? topEleInfo.num+1 : 0;
      console.log('topEleInfo.eles ', topEleInfo ? topEleInfo.eles : topEleInfo);
      const eleId = ele+'-'+topEleNum;
      console.log('eleId ', eleId);
      // const topEleIds = topEleInfo ? topEleInfo.eles.push(eleId) : [ele+'-0'];
      // console.log('topEleIds ', topEleIds);
      this.setState({
        topEles: {
          ...this.state.topEles,
          [ele]: {
            num: topEleNum,//记录个数
            eles: topEleInfo ? [...topEleInfo.eles, eleId] : [ele+'-0']//拖入编辑区的节点id
          }
        },
        boxElesPos: {
          ...this.state.boxElesPos,
          [ele+'-'+topEleNum]: [x, y],
        },
        boxPosEles: {
          ...this.state.boxPosEles,
          [pos]: ele+'-'+topEleNum
        },
        dragState: 'drop'
      });
    } else if (this.state.dragState === 'moving') {
      const eleArr = ele.split('-');//ele: 'ha-15'
      const eleSource = eleArr[0];
      const topEleInfo = this.state.topEles[eleSource];
      const boxPosEles = this.state.boxPosEles;
      const boxElesPos = this.state.boxElesPos;
      const oldPosArr = boxElesPos[ele];
      const oldPos = oldPosArr[0]+'-'+oldPosArr[1];
      let newBoxPosEles = {};
      for(let inEle in boxPosEles) {
        // console.log('inEle oldPos ', inEle, oldPos);
        if (inEle === oldPos) {
          newBoxPosEles[pos] = ele;
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
    const pos = x+'-'+y;
    const text = this.state.boxPosEles[pos];
    // console.log('text ', pos, text);
    const [knightX, knightY] = this.props.position;
    return (
      <div key={i}
           style={{ width: '12.5%', height: '12.5%' }}>
        <BoardSquare x={x} y={y} knightX={knightX} knightY={knightY} text={text} handleDrop={this.handleDrop} handleDrag={this.handleDragMove} />
      </div>
    )
  }

  // componentDidUpdate = (preProps, preState) => {
  //   console.log('preState ', preState);
  // }
  
  render() {
    var squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }
    return (
      <div>
        <One title="true" text="he" handleDrag={this.handleDragAdd} />
        <One title="true" text="ha" handleDrag={this.handleDragAdd} />
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