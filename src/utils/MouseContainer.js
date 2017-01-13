import React, { Component } from 'react';

const MyContainer = (WrappedComponent) => 
	class extends Component {
		constructor(props) {
			super(props);
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

		render() {
			const newProps = {
				wrapMouseProps: {
					onMouseUp: this.handleMouseUp,
					onMouseDown: this.handleMouseDown
				}
			}
			return (
				<WrappedComponent {...this.props} {...newProps} />
			)
		}
	}

export default MyContainer;