import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Icon } from 'antd';//, Input
import { search, searchResults, deleteSearchItem } from '../redux/actions';
// import { search } from '../redux/actions';
// import 'searchd/dist/searchd.css';//不需要
// import '../styles/mystyle.css';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: '',
			searchResultsShow: false
		}
	}
	
	handleChange = (e) => {
		let searchVal = this.refs.mySearch.value;
		this.setState({searchText: searchVal});
	}

	handleKeyDown = (e) => {
		if (e.keyCode == 13) {
			let searchVal = this.refs.mySearch.value;
			this.props.dispatch(search(searchVal));
			this.handleSearch(searchVal);
		}
	}
	
	handleClick = (e) => {
		let searchVal = this.refs.mySearch.value;
		this.props.dispatch(search(searchVal));
		this.handleSearch(searchVal);
	}

	handleSearch = (searchVal) => {
		this.setState({searchResultsShow: true});
		console.log('1 dispatch search', searchVal);
		let results = [];
		const { dispatch, menus } = this.props;
		if (searchVal.length) {
			let escapedSearchText = searchVal.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
			let regex = this.get_search_regex(escapedSearchText);
			let highlightRegex = this.get_highlight_regex(escapedSearchText);
			const topMenus = Object.keys(menus);
			const search_string_match = this.search_string_match;
			topMenus.map(function(topMenu, topIndex) {
				let filesAll = menus[topMenu];
				let files = Object.keys(filesAll);
				files.map(function(file, fileIndex) {
					let workflowsArr = filesAll[file];
					workflowsArr.map(function(workflow, workIndex) {
						if (search_string_match(workflow, regex)) {
							results.push({workflow, path: "'l"+topIndex+"l"+fileIndex+"l"+workIndex+"'"});
						}
					});
				})
			});
			dispatch(searchResults(results));
			console.log('9 dispatch searchKey', results);
		} else {
			dispatch(searchResults(results));
		}
	}

	searchResultClick = (index) => {
		// if (e.target && e.target.matches('i.anticon')) {}
		this.props.dispatch(deleteSearchItem(index));
	}

	get_search_regex = (escaped_search_string) => {
    return new RegExp(escaped_search_string, "i");//"^" + 
  }

  get_highlight_regex = (escaped_search_string) => {
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

  hide = (e) => {
  	// if (!isMounted()) { return false; }

  	const node = ReactDOM.findDOMNode(this);
  	const target = e.target || e.srcElement;
  	const isInside = node.contains(target);

  	if (this.state.searchResultsShow && !isInside) {
  		this.setState({
  			searchResultsShow: false
  		});
  	}
  }

  componentDidUpdate = (prevProps, prevState) => {
  	if(!this.state.searchResultsShow && prevState.searchResultsShow) {
  		document.removeEventListener('click', this.hide);
  	}

  	if(this.state.searchResultsShow && !prevState.searchResultsShow) {
  		document.addEventListener('click', this.hide);
  	}
  }

  componentWillUnmount = () => {
  	document.removeEventListener('click', this.hide);
  }

	render () {
		const inputStyle = {margin: '2px 2px 2px 15px', width: '75%'};
		const searchStyle = {padding: '0 2%'}
		let { search, searchResults } = this.props;
		let searchResultClick = this.searchResultClick;
		return (
			<div className="search">
				<span className="ant-input-preSuffix-wrapper">
					<input type="text" placeholder="搜索工作流" value={this.state.searchText} ref="mySearch" className="ant-input ant-input-search" onChange={this.handleChange} onKeyDown={::this.handleKeyDown}/>
					<span className="ant-input-suffix">
						<i className="anticon anticon-search ant-input-search-icon" onClick={this.handleClick}></i>
					</span>
				</span>
				<div className="search-results">
					{
						this.state.searchResultsShow && ((searchResults.length) ? searchResults.map(function(result, index) {
							return <div className="search-result" key={"result"+index} data-key={index} data-path={result.path}>{ result.workflow }<Icon type="close-circle-o" onClick={(index) => searchResultClick(index)}/></div>
						}) : <div className="search-zero">没有匹配工作流</div>)
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { search, menus, searchResults } = state;
	return { search, menus, searchResults };
}

export default connect(mapStateToProps)(Search);
