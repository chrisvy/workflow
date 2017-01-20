var React = require('react');
var PropTypes = React.PropTypes;
var Square = require('./Square');
import ItemTypes from './Constants';
import { DropTarget } from 'react-dnd';


const squareTarget = {
  drop: function (props) {
    moveKnight(props.x, props.y);
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

var BoardSquare = React.createClass({
  propTypes: {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isOver: PropTypes.bool.isRequired
  },

  render: function () {
    const x = this.props.x;
    const y = this.props.y;
    const connectDropTarget = this.props.connectDropTarget;
    const isOver = this.props.isOver;

    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Square>
          {this.props.children}
        </Square>
        {isOver &&
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }} />
        }
      </div>
    )
  }
});

module.exports = BoardSquare;