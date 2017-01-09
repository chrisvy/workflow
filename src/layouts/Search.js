import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Input } from 'antd';
import { search } from '../redux/actions';
// import 'antd/dist/antd.css';
// import '../styles/mystyle.css';

class Search extends Component {
	constructor(props) {
		super(props);
	}

	handleClick = () => {
		let searchVal = this.refs.mySearch.value;
		this.props.dispatch(search(searchVal));
	}

	render () {
		const inputStyle = {margin: '2px 2px 2px 15px', width: '75%'};
		const searchStyle = {padding: '0 2%'}
		let { search } = this.props;
		return (
			<div className="search">
				<Input placeholder="请输入工作流" style={inputStyle} ref="mySearch" value={search} onChange={this.handleClick}/>
				<Icon type="search" style={searchStyle} onClick={this.handleClick}/>
				<Icon type="environment-o" style={searchStyle}/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { search } = state;
	return { search };
}

export default connect(mapStateToProps)(Search);
