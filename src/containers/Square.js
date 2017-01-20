import React from 'react';
let PropTypes = React.PropTypes;

var Square = React.createClass({
  propTypes: {
    black: PropTypes.bool
  },

  render: function () {
    let black = this.props.black;
    let fill = black ? 'black' : 'white';
    let stroke = black ? 'white' : 'black';

    return (
    	<div style={{
        backgroundColor: fill,
        color: stroke,
        width: '100%',
        height: '100%',
        border: 'solid 1px #eee'
      }}>
        {this.props.children}
      </div>
    )
  }
});

export default Square;