import React, { Component, PropTypes } from 'react';

export class DragSvg extends Component {
	constructor(props) {
    super(props);

    this.state = {
      size: 800,
      fontSize: 12,
      fontFamily: 'inherit',
      fontColor: 'inherit'
    };
  }

  render = () => {
  	return <svg width={this.state.size} height={this.state.size} style={{
        fontSize: this.state.fontSize,
        fontFamily: this.state.fontFamily
      }}>
      {this.props.children}
    </svg>
  }
}

