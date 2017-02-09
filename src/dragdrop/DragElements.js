import React, { Component, PropTypes } from 'react';
import ItemTypes from './Constants';
import { DragSource } from 'react-dnd';

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

let oneSource = {
  beginDrag: function (props) {
    console.log('begin drag');
    if (props.title === "true") {
      console.log("true", props.lastDroppedText);
    } else {
      props.handleDragMove(props.lastDroppedText);
    }
    props.handleDrag(props.lastDroppedText);
    return {};
  },

  endDrag: function (props) {
    console.log('end drag');
    return {};
  }
}

@DragSource(props => props.lastDroppedText, oneSource, collect)
export class One extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  }

  render() {
    const { connectDragSource, isDragging, lastDroppedText } = this.props;
    return connectDragSource(
      <div style={{
        display: 'inline-block',
        fontSize: 20,
        margin: 3,
        fontWeight: 'bold',
        cursor: 'move',
        height: '100%',
        opacity: isDragging ? 0.5 : 1
      }}>
        { lastDroppedText }
      </div>
    );
  }
}

let twoSource = {
  beginDrag: function (props) {
    console.log('begin drag');
    return {};
  },

  endDrag: function (props) {
    console.log('end drag');
    return {};
  }
}

@DragSource(ItemTypes.TWO, twoSource, collect)
export class Two extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  }

  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div style={{
        display: 'inline-block',
        fontSize: 20,
        margin: 3,
        fontWeight: 'bold',
        cursor: 'move',
        height: '100%',
        opacity: isDragging ? 0.5 : 1
      }}>
        { ItemTypes.TWO }
      </div>
    );
  }
}
