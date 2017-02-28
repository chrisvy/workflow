import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Input } from 'yo-component';
import { contextItem, addDir } from '../actions/actions';

class AddDirModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ""
    }
  }

  // menus: [
  //   {'工作流开发': [{'4G业务': ['text_workflow', 'text_phone']}, {'宽带业务': ['21','22']}, {'信令': [{"二级目录": [{"三级目录": ['工作流']}]}]}]},
  //   {'回收站': [{'d1':['d1.1','d1.2']}]}
  // ]
  handleOk = (e) => {
    const newFile = this.refs.input.value;//校验
    console.log('Clicked OK', newFile);
    this.props.dispatch(addDir(newFile));
  }

  handleCancel = (e) => {
    console.log(e);
    this.props.dispatch(contextItem(""));
  }

  render() {

    const { contextOperate, contextButton } = this.props;
    return (
      <div>
        <Modal title="Add File" visible={ !contextButton && contextOperate === "addDir" }
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <input type="text" placeholder="请输入目录名称" className="ant-input" ref="input" />
        </Modal>
      </div>
    );
  }

}

const mapStateToProps = state => {
  const { menuReducer: { menus }, menuConReducer: { contextInfo, contextOperate, contextButton } } = state;
  return { menus, contextInfo, contextOperate, contextButton };
}

export default connect(mapStateToProps)(AddDirModal);
