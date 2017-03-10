import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Input } from 'yo-component';
import { contextItem, addDir } from '../actions/actions';

import newdir from '../api/newdir';

class AddDirModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ""
    }
  }

  handleOk = (e) => {
    const newFile = this.refs.input.value;//校验
    console.log('Clicked OK', newFile);//TODO
    this.props.dispatch(addDir(newdir.data));
  }

  handleCancel = (e) => {
    console.log(e);
    this.props.dispatch(contextItem(""));
  }

  render() {

    const { contextOperate, contextButton } = this.props;
    return (
      <div>
        <Modal title="新建目录" visible={ !contextButton && contextOperate === "addDir" }
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <input type="text" placeholder="请输入目录名称" className="ant-input" ref="input" />
        </Modal>
      </div>
    );
  }

}

const mapStateToProps = state => {
  const { menusReducer: { menus, contextInfo, contextOperate, contextButton } } = state;
  return { menus, contextInfo, contextOperate, contextButton };
}

export default connect(mapStateToProps)(AddDirModal);
