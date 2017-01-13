import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuItems from '../menus/MenuItems';
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

  // hideMenu();

  // showMenu({
  //     position: {x, y},
  //     target: this.elem,
  //     id: this.props.id,
  //     data: callIfExists(this.props.collect, this.props)
  // });
  }

	render() {
		
		const { wrapDisplayProps, contextInfo } = this.props;
    return (
      <div className="ant-row">
        <ContextTrigger onContextMenu={this.handleContextClick}>
          <div className="mymenu">
            <ul className="root-menu">
              <MenuItems/>
            </ul>
          </div>
        </ContextTrigger>
        <ContextMenu menuShow={wrapDisplayProps.showFlag} x={this.state.x} y={this.state.y} contextInfo={contextInfo} />
      </div>
    );
  }

}

const mapStateToProps = state => {
	const { contextInfo } = state;
	return { contextInfo };
}

export default connect(mapStateToProps)(Contexts);

