import React, { Component, PropTypes } from 'react';
import Square from './Square';
import ItemTypes from './Constants';
import { canMoveKnight, moveKnight } from './MoveAct';
import { DropTarget } from 'react-dnd';
import { One, Two } from './DragElements';

const squareTarget = {
  canDrop(props) {
    return canMoveKnight(props.text);
  },

  drop: function (props, monitor) {
    console.log('drop ', monitor.getItem().text, props.x, props.y);
    props.handleDrop(monitor.getItem().text, props.x, props.y);
    props.onDrop(monitor.getItemType());
    moveKnight(props.x, props.y);
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    // draggingText: monitor.getItemType()
  };
}

@DropTarget([...Object.values(ItemTypes)], squareTarget, collect)
class TargetBox extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    // draggingText: PropTypes.string,
    connectDropTarget: PropTypes.func.isRequired
  }

  renderOverlay(color) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    );
  }

  // componentWillMount() {
  //   console.log('componentWillMount');
  // }

  render() {
    const { x, y, text, connectDropTarget, isOver, canDrop, lastDroppedText, handleDrag, knightX, knightY } = this.props;
    // console.log('draggingText ', lastDroppedText , x, y, knightX, knightY);
    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Square text={text} knightX={knightX} knightY={knightY} handleDrag={handleDrag} />
        {isOver && !canDrop && this.renderOverlay('red')}
        {isOver && canDrop && this.renderOverlay('green')}
      </div>
    );
  }
}

export default class StatefulBoardSquare extends Component {
  constructor(props) {
    super(props);
    this.state = { lastDroppedText: null };
  }

  render() {
    return (
      <TargetBox
        {...this.props}
        lastDroppedText={this.state.lastDroppedText}
        onDrop={text => this.handleDrop(text)}
      />
    );
  }

  handleDrop(text) {
    this.setState({
      lastDroppedText: text,
    });
  }
}
