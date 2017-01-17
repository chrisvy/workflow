import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Input } from 'antd';
import Cascader from '../Cascader/index';
import { contextItem, addWorkflow } from '../actions/actions';
import './modals.css';

class AddWorkModal extends Component {

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
    this.props.dispatch(addWorkflow(newFile));
  }

  handleCancel = (e) => {
    console.log(e);
    this.props.dispatch(contextItem(""));
  }

  render() {

    const { contextOperate, contextButton } = this.props;
    return (
      <div>
        <Modal title="新建工作流-基本信息" visible={ !contextButton && contextOperate === "addWorkflow" }
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <form className="ant-form">
            <div className="ant-row ant-form-item">
              <div className="ant-col-6 ant-form-item-label">
                <label /*htmlFor=""*/>
                  所属目录
                </label>
              </div>
              <div className="ant-col-18">
                <Cascader />
              </div>
            </div>
            <div className="ant-row ant-form-item">
              <div className="ant-col-6 ant-form-item-label">
                <label /*htmlFor=""*/>
                  名称
                </label>
              </div>
              <div className="ant-col-18">
                <input type="text" placeholder="请输入工作流名称" className="ant-input" ref="input" />
              </div>
            </div>
            <div className="ant-row ant-form-item">
              <div className="ant-col-6 ant-form-item-label">
                <label /*htmlFor=""*/>
                  调度类型
                </label>
              </div>
              <div className="ant-col-18 my-radio-group">
                <div className="ant-radio-group">
                  <label htmlFor="" className="ant-radio-wrapper">
                    <span className="ant-radio">
                      <span className="ant-radio-inner"></span>
                      <input type="radio" className="ant-radio-input"/>
                    </span>
                    <span>手工调度</span>
                  </label>
                  <label htmlFor="" className="ant-radio-wrapper">
                    <span className="ant-radio">
                      <span className="ant-radio-inner"></span>
                      <input type="radio" className="ant-radio-input"/>
                    </span>
                    <span>自动调度</span>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    );
  }

}

const mapStateToProps = state => {
  const { menuConReducer: { contextInfo, contextOperate, contextButton } } = state;
  return { contextInfo, contextOperate, contextButton };
}

export default connect(mapStateToProps)(AddWorkModal);