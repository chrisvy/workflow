import React, { Component, PropTypes } from 'react';
import ItemTypes from './Constants';
import { One, Two } from './DragElements';

export default class Square extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { lastDroppedText } = this.props;
    // console.log('lastDroppedText ', lastDroppedText);
    // let childEle;
    // switch (lastDroppedText) {
    //   case ItemTypes.ONE:
    //     childEle = <One />;
    //     break;
    //   case ItemTypes.TWO:
    //     childEle = <Two />;
    //     break;
    //   default:
    //     childEle = null;
    // }

    // return (
    //   <div style={{
    //     width: '100%',
    //     height: '100%'
    //   }}>
    //     { childEle }
    //   </div>
    // );

    return (
      <div style={{
        width: '100%',
        height: '100%'
      }}>
        {lastDroppedText && <One lastDroppedText={lastDroppedText} />}
      </div>
    );
  }
}
