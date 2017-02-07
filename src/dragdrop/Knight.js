import React, { Component, PropTypes } from 'react';
import ItemTypes from './Constants';
import { DragSource } from 'react-dnd';

let knightSource = {
  beginDrag: function (props) {
    return {};
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

@DragSource(ItemTypes.KNIGHT, knightSource, collect)
export default class Knight extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  }

  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div style={{
        fontSize: 40,
        fontWeight: 'bold',
        cursor: 'move',
        height: '100%',
        opacity: isDragging ? 0.5 : 1
      }}>
        ♘
      </div>
    );
  }
}
