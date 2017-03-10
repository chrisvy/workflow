import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const DisplayContainer = (MYLICLASS) => (WrappedComponent) => 
	class extends Component {
		constructor(props) {
			super(props);

			this.state = {
				showFlag: false
			}
		}

		hide = (e) => {
	  	// if (!isMounted()) { return false; }
	  	// const node = ReactDOM.findDOMNode(this);//this为整个被displayContainer包装起来的组件
	  	const target = e.target || e.srcElement;
	  	// const isInside = node.contains(target);//target为事件对象，如cascsder组件中点击的option或li元素

	  	if (this.state.showFlag && !target.classList.contains(MYLICLASS)) {
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
	  	}

	  	if(this.state.showFlag && !prevState.showFlag) {
	  		document.addEventListener('click', this.hide);
	  	}
	  }

	  componentWillUnmount = () => {
	  	document.removeEventListener('click', this.hide);
	  }

		render() {
			const newProps = {
				wrapDisplayProps: {
					showFlag: this.state.showFlag,
					show: this.show,
					innerHide: this.innerHide
				}
			}
			console.log("liClass", this.props);
			return (
				<WrappedComponent {...this.props} {...newProps} />
			)
		}
	}

export default DisplayContainer;