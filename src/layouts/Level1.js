import React, { Component } from 'react';
import { connect } from 'react-redux';
var classNames = require('classnames');
import { open } from '../redux/actions';
import Level2 from './Level2';

class Level1 extends Component {
	constructor(props) {
    super(props);

    this.state = {
    	divOpen : false
    };
  }

	handleClick = (e) => {
		if (e.target && e.target.matches('div.top-menu-title')) {
			this.props.dispatch(open(this.props.path));
		}
	}

	render() {
		let { level1Items, topItem, handleClickLi, path, topMenuStatus } = this.props;
		let keyIndex = 0;
		let topMenuKey = Object.keys(level1Items);//['工作流开发', '回收站', '其他']
		// console.log('topMenuStatus', topMenuStatus, path, topMenuStatus[path], "'"+path+"'");
		let divClass = classNames("top-menu", {"top-menu-open" : topMenuStatus[path]});//{divOpen : !this.state.divOpen}
		return (
			<div>
				<li className={divClass} onClick={this.handleClick} data-path={path}>
					<div className="top-menu-title">{topItem}</div>
					<ul>
					{
						topMenuKey.map(function(item, index) {
							const pathData = path + "l" + index;
							return <Level2 key={'in' + index} subMenu={item} subItems={level1Items[item]} handleClickLi={handleClickLi} path={pathData}></Level2>
						})
					}
					</ul>
				</li>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { topMenuStatus } = state;
	return { topMenuStatus } ;
}

export default connect(mapStateToProps)(Level1);
