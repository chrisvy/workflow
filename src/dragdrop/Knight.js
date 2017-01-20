import React from 'react';
import ItemTypes from './constants';
import { DragSource } from 'react-dnd';

let knightSource = {
  beginDrag: function (props) {
    return {};
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

let Knight = React.createClass({

  render: function () {
		let connectDragSource = this.props.connectDragSource;
	  let isDragging = this.props.isDragging;
    return connectDragSource(
    	<div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move'
      }}>♘</div>
    )
  }
});

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);