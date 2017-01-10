import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';//, Input
import { search, searchKey } from '../redux/actions';
// import { search } from '../redux/actions';
// import 'antd/dist/antd.css';//不需要
// import '../styles/mystyle.css';

class Search extends Component {
	constructor(props) {
		super(props);
	}

	handleClick = () => {
		let searchVal = this.refs.mySearch.value;
		this.props.dispatch(search(searchVal));
		// console.log('1 dispatch search', searchVal);
		if (searchVal.length) {
			let escapedSearchText = searchVal.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
			let regex = this.get_search_regex(escapedSearchText);
			let highlightRegex = this.get_highlight_regex(escapedSearchText);
			const { dispatch, menus } = this.props;
			const topMenus = Object.keys(menus);
			const search_string_match = this.search_string_match;
			topMenus.map(function(topMenu, topIndex) {
				let filesAll = menus[topMenu];
				let files = Object.keys(filesAll);
				files.map(function(file, fileIndex) {
					let workflowsArr = filesAll[file];
					workflowsArr.map(function(workflow, workIndex) {
						if (search_string_match(workflow, regex)) {
							dispatch(searchKey("'l"+topIndex+"l"+fileIndex+"l"+workIndex+"'"));
							console.log('9 dispatch searchKey', "'l"+topIndex+"l"+fileIndex+"l"+workIndex+"'");
						}
					});
				})
			});
		}
	}

	get_search_regex = (escaped_search_string) => {
    // var regex_anchor, regex_flag;
    // regex_anchor = this.search_contains ? "" : "^";
    // regex_flag = this.case_sensitive_search ? "" : "i";
    // return new RegExp(regex_anchor + escaped_search_string, regex_flag);
    return new RegExp(escaped_search_string, "i");//"^" + 
  }

  get_highlight_regex = (escaped_search_string) => {
    // var regex_anchor, regex_flag;
    // regex_anchor = this.search_contains ? "" : "\\b";
    // regex_flag = this.case_sensitive_search ? "" : "i";
    // return new RegExp(regex_anchor + escaped_search_string, regex_flag);
    return new RegExp("\\b" + escaped_search_string, "i");//\b匹配字母、数字、下划线
  }

  search_string_match = function(search_string, regex) {
    // var i, len, part, parts;
    if (regex.test(search_string)) {
      return true;
    } 
    // else if (this.enable_split_word_search && (search_string.indexOf(" ") >= 0 || search_string.indexOf("[") === 0)) {
    //   parts = search_string.replace(/\[|\]/g, "").split(" ");
    //   if (parts.length) {
    //     for (i = 0, len = parts.length; i < len; i++) {
    //       part = parts[i];
    //       if (regex.test(part)) {
    //         return true;
    //       }
    //     }
    //   }
    // }
  }

	render () {
		const inputStyle = {margin: '2px 2px 2px 15px', width: '75%'};
		const searchStyle = {padding: '0 2%'}
		let { search } = this.props;
		return (
			<div className="search">
				{/* <Input placeholder="请输入工作流" style={inputStyle} ref="mySearch" value={search} onChange={this.handleClick}/> */}
				<input type="text" placeholder="请输入工作流" value={search} ref="mySearch" className="ant-input" style={inputStyle} onChange={this.handleClick}/>
				<Icon type="search" style={searchStyle} onClick={this.handleClick}/>
				<Icon type="environment-o" style={searchStyle}/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { search, menus, menuStatus } = state;
	return { search, menus, menuStatus };
}

export default connect(mapStateToProps)(Search);
