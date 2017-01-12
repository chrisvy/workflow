import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../styles/mystyle.css';
// import MyMenuItem from './MyMenuItem';
import MenuItems from '../menus/MenuItems';
import Search from './Search';
import ContextMenu from '../contexts/ContextMenu';

class MyMenu extends Component {
  
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


  handleContextMenu() {
    console.log("right");
  }

  handleMouseDown = (event) => {
      if (this.props.holdToDisplay >= 0 && event.button === 0) {
          event.persist();

          this.mouseDownTimeoutId = setTimeout(
              () => this.handleContextClick(event),
              this.props.holdToDisplay
          );
      }
  }

  handleMouseUp = (event) => {
      if (event.button === 0) {
          clearTimeout(this.mouseDownTimeoutId);
      }
  }

 handleContextClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const x = event.clientX || (event.touches && event.touches[0].pageX);
    const y = event.clientY || (event.touches && event.touches[0].pageY);
    
    this.setState({
      menuShow: true,
      x,
      y
    });

    // hideMenu();

    // showMenu({
    //     position: {x, y},
    //     target: this.elem,
    //     id: this.props.id,
    //     data: callIfExists(this.props.collect, this.props)
    // });
  }

	render() {

    return (
      <div className="ant-row">
        <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-6 ant-col-lg-5">
          <Search />
          <div className="context-wrapper" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onContextMenu={this.handleContextClick}>
            <div className="mymenu">
              <ul className="root-menu">
                <MenuItems/>
              </ul>
            </div>
          </div>
          <ContextMenu menuShow={this.state.menuShow} x={this.state.x} y={this.state.y}/>
        </div>
        <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-18 ant-col-lg-19">
          {this.props.children}
        </div>
      </div>
    );
  }

}

export default MyMenu;
