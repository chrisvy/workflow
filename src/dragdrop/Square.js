import React from 'react';
let PropTypes = React.PropTypes;

var Square = React.createClass({
  propTypes: {
    black: PropTypes.bool
  },

  render: function () {
    const { handleSquareClick } = this.props;
    return (
    	<div style={{
        width: '100%',
        height: '100%',
        border: 'solid 1px #eee'
      }} onClick={handleSquareClick}>
        {this.props.children}
      </div>
    )
  }
});

export default Square;