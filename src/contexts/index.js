import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuItems from '../menus/index';
import ContextMenu from './ContextMenu';
import ContextTrigger from './ContextTrigger';
import HideDisplayContainer from '../utils/HideDisplayContainer';

@HideDisplayContainer
class Contexts extends Component {

	static defaultProps = {
    holdToDisplay: 1000
  }

	constructor(props) {
		super(props);

    this.state = {
      menuShow: false,
      x: 0,
      y: 0
    }
	}

	handleContextClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const x = event.clientX;// || (event.touches && event.touches[0].pageX)
    const y = event.clientY;// || (event.touches && event.touches[0].pageY)
    
    this.setState({
      menuShow: true,
      x,
      y
    });

    this.props.wrapDisplayProps.show();
  }

	render() {
		
		const { wrapDisplayProps } = this.props;
    return (
      <div className="ant-row">
        <ContextTrigger onContextMenu={this.handleContextClick}>
          <div className="mymenu menu-box">
            <ul className="root-menu">
              <MenuItems/>
            </ul>
          </div>
        </ContextTrigger>
        <ContextMenu menuShow={wrapDisplayProps.showFlag} x={this.state.x} y={this.state.y} />
      </div>
    );
  }

}

export default connect()(Contexts);

