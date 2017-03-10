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
      console.log("add", props.text);
    } else {
      console.log("move", props.text);
    }
    props.handleDrag(props.text);
    return {text: props.text};
  },

  endDrag: function (props) {
    console.log('end drag');
    return {};
  }
}

@DragSource(props => props.text.split('-')[0], oneSource, collect)
export class One extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  }

  render() {
    const { connectDragSource, isDragging, lastDroppedText, text } = this.props;
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
        { text }
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
