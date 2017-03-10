import React, { Component } from 'react';
import classNames from 'classnames';
import DisplayContainer from '../utils/DisplayContainerForInputCascader';
import SearchContainer from '../utils/SearchContainer';

const initialData = [{//初始时获取到的下拉列表数据
    		id: 1,
    		name: "abc",
    		type: 0//dir
    	},{
    		id: 2,
    		name: "aac",
    		type: 0
    	},{
    		id: 3,
    		name: "bbbc",
    		type: 1//file
    	}];
const fetchData = [{//选择下拉列表中的文件夹选项后，再次发送请求获取的新数据
    		id: 4,
    		name: "def",
    		type: 0//dir
    	},{
    		id: 5,
    		name: "ddf",
    		type: 0
    	},{
    		id: 6,
    		name: "eefgv",
    		type: 1//file
    	}];
const deleteData = [{//删除输入的值，需要重新请求数据的情况
    		id: 7,
    		name: "hij",
    		type: 0//dir
    	},{
    		id: 8,
    		name: "hhi",
    		type: 0
    	},{
    		id: 9,
    		name: "hijkl",
    		type: 1//file
    	}];
const MYLICLASS = "inputcascader";

@DisplayContainer(MYLICLASS)
@SearchContainer
class InputCascader extends Component {
	constructor(props) {
    super(props);

    this.state = {
    	list: initialData,
    	filterList: initialData,
    	children: null,
    	value: '',
    	lastLevel: 0,
    }
  }

  static defaultProps = {
  	liClass: "inputcascader"
  };

  // componentDidMount = () => {
  // 	this.setState({
  // 		filterList: initialData
  // 	});
  // }

	handleLiClick = item => e => {//handleSelect
		// e.stopPropagation();
		this.props.wrapDisplayProps.show();
		const tail = item.type ? "" : "/";
		const preVal = this.state.value;
		// console.log("preVal", preVal);
		const preIndex = preVal.lastIndexOf("/");
		const baseVal = preIndex === -1 ? "" : preVal.slice(0, preIndex+1);
		this.setState({
			value: baseVal + item.name + tail,
			list: fetchData,
			filterList: fetchData
		});
		console.log("click");
	}

	handleChange = e => {//handleChange
		const { wrapSearchProps: { get_search_regex, search_string_match } } = this.props;
		let results = [];
		const inputVal = e.target.value;
		const oldVal = this.state.value;
		const lastIndex = inputVal.lastIndexOf("/");
		if (inputVal.indexOf(oldVal) === 0 || (oldVal.indexOf(inputVal) === 0 && oldVal.lastIndexOf("/") === lastIndex)) {//新增或删除最后一层
			const inputTail = inputVal === -1 ? inputVal : inputVal.slice(lastIndex+1);
			// console.log("inputTail", inputTail);
			if (inputTail.length) {//新输入的是字符，或删除以后最后一个'/'后还有字符，则进行过滤
				let escapedSearchText = inputTail.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
				let regex = get_search_regex(escapedSearchText);
				this.state.list.map(function(item, index) {
					if (search_string_match(item.name, regex)) {
						// console.log('4 match', workflow);
						results.push(item);
					}
				});
			} else {//输入的是'/'，或删除最后一层的字符直到剩下'/'，则直接列出获取到的结果
				results = this.state.list;
			}
			this.setState({
				value: e.target.value,
				filterList: results
			});
		} else {
			//删除其他，需要发送请求
			this.setState({
				value: e.target.value,
				list: deleteData,
				filterList: deleteData
			});
		}
		console.log("change");
	}

	handleClick = e => {
		this.props.wrapDisplayProps.show();
	}

	// componentDidUpdate = (preProps, preState) => {
	// 	if (!this.props.wrapDisplayProps.showFlag) {
	// 		this.props.wrapDisplayProps.show();//防止下拉列表更新时，下拉列表隐藏
	// 	}
	// }

	render() {
		const { wrapDisplayProps } = this.props;
		const cascaderClass = classNames("my-cascader-menus", {"my-cascader-menus-show": wrapDisplayProps.showFlag });
		const flagClass = classNames({"ant-select-open": wrapDisplayProps.showFlag });
		return (
			<div className={flagClass}>
				<input type="text" placeholder="选择所属目录" className="ant-input ant-cascader-input" ref="input" value={this.state.value} autoComplete="off" onClick={this.handleClick} onChange={this.handleChange} />
	      <ul className={cascaderClass}>
					{
						this.state.filterList.length ? this.state.filterList.map((item, index) => <li key={"in"+item.id} onClick={this.handleLiClick(item)} className={MYLICLASS} >{item.name}</li>) : <span>未找到数据</span>
					}
				</ul>
			</div>
		)
	}
}

export default InputCascader;
