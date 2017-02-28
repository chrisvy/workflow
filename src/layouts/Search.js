import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'yo-component';//, Input
import { search, searchResults, deleteSearchItem } from '../actions/actions';
// import { search } from '../redux/actions';
// import 'searchd/dist/searchd.css';//不需要
// import '../styles/mystyle.css';
import DisplayContainer from '../utils/DisplayContainer';

@DisplayContainer
class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchText: ''
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
		// this.setState({showFlag: true});
		this.props.wrapDisplayProps.show();
		let results = [];
		const { dispatch, menus, parsedRes } = this.props;
		// console.log('1 dispatch search', searchVal);
		if (searchVal.length) {
			let escapedSearchText = searchVal.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
			let regex = this.get_search_regex(escapedSearchText);
			let highlightRegex = this.get_highlight_regex(escapedSearchText);
			const search_string_match = this.search_string_match;
			const works = parsedRes["works"];
			const pathArr = Object.keys(works);//{"path1":"name1","path2":"name2",...}
			// console.log('2 search', pathArr);
			pathArr.map(function(path, index) {
				const workflow = works[path];
				// console.log('3 workflow', workflow);
				if (search_string_match(workflow, regex)) {
					// console.log('4 match', workflow);
					results.push({workflow, path});
				}
			});
			dispatch(searchResults(results));
			// console.log('9 dispatch searchKey', results);
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

  

	render () {
		const inputStyle = {margin: '2px 2px 2px 15px', width: '75%'};
		const searchStyle = {padding: '0 2%'}
		let { search, searchResults, wrapDisplayProps } = this.props;
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
						wrapDisplayProps.showFlag && ((searchResults.length) ? searchResults.map(function(result, index) {
							return <div className="search-result" key={"result"+index} data-key={index} data-path={result.path}>{ result.workflow }<Icon type="close-circle-o" onClick={(index) => searchResultClick(index)}/></div>
						}) : <div className="search-zero">没有匹配工作流</div>)
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { menuReducer: { menus, parsedRes }, searchReducer: { search, searchResults } } = state;
	return { menus, parsedRes, search, searchResults };
}

export default connect(mapStateToProps)(Search);
