import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const DisplayContainer = (WrappedComponent) => 
	class extends Component {
		constructor(props) {
			super(props);

			this.state = {
				showFlag: false
			}
		}

	  hide = (e) => {
	  	// if (!isMounted()) { return false; }
	  	const node = ReactDOM.findDOMNode(this);//this为整个被displayContainer包装起来的组件
	  	const target = e.target || e.srcElement;
	  	const isInside = node.contains(target);//target为事件对象，如cascsder组件中点击的option或li元素
	  	// const isInside = target.matches(".contextflag");
	  	// console.log("isInside", isInside, target);

	  	if (this.state.showFlag && !isInside) {
	  		this.setState({
	  			showFlag: false
	  		});
	  	}
	  }

	  innerHide = () => {
	  	this.setState({
				showFlag: false
			});
	  }

	  show = () => {
	  	this.setState({
				showFlag: true
			});
	  }

	  componentDidUpdate = (prevProps, prevState) => {
	  	if(!this.state.showFlag && prevState.showFlag) {
	  		document.removeEventListener('click', this.hide);
	  		document.removeEventListener('contextmenu', this.hide);
	  	}

	  	if(this.state.showFlag && !prevState.showFlag) {
	  		document.addEventListener('click', this.hide);
	  		document.addEventListener('contextmenu', this.hide);
	  	}
	  }

	  componentWillUnmount = () => {
	  	document.removeEventListener('click', this.hide);
	  	document.removeEventListener('contextmenu', this.hide);
	  }

		render() {
			const newProps = {
				wrapDisplayProps: {
					showFlag: this.state.showFlag,
					show: this.show,
					innerHide: this.innerHide
				}
			}
			return (
				<WrappedComponent {...this.props} {...newProps} />
			)
		}
	}

export default DisplayContainer;