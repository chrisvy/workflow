import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menus from '../menus/index';
import ContextTrigger from './ContextTrigger';
import HideDisplayContainer from '../utils/DisplayContainer';
import { contextMenuShow } from '../actions/actions';
import '../styles/ContextMenu.css';

@HideDisplayContainer
class Contexts extends Component {

	static defaultProps = {
    holdToDisplay: 1000
  }

	constructor(props) {
		super(props);

    // this.state = {
    //   menuShow: false,
    //   x: 0,
    //   y: 0
    // }
	}

	handleContextClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const x = event.clientX;// || (event.touches && event.touches[0].pageX)
    const y = event.clientY;// || (event.touches && event.touches[0].pageY)

    // this.setState({
    //   menuShow: true,
    //   x,
    //   y
    // });
    this.props.dispatch(contextMenuShow(x, y, true));
    this.props.wrapDisplayProps.show();
  }

  componentWillReceiveProps = (nextProps, nextState) => {
    if (this.props.wrapDisplayProps.showFlag && !nextProps.wrapDisplayProps.showFlag) {
      this.props.dispatch(contextMenuShow(0, 0, false));
    }
  }

	render() {
		
		const { wrapDisplayProps, menuTab } = this.props;
    return (
      <div className="outer-menu-box">
        <ContextTrigger >
          <Menus onContextMenu={this.handleContextClick} />
        </ContextTrigger>
        
      </div>
    );
  }

}

export default connect()(Contexts);

