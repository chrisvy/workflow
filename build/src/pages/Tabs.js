import React, { Component } from 'react';
import { Table } from 'antd';
import { Tabs, Form, Input, Select, Row, Col, Tag, Upload } from 'yo-component';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
var classNames = require('classnames');
import 'yo-component/dist/antd.css';
import BoardTop from '../dragdrop/BoardTop';
import '../styles/tabContent.css';
import "../styles/form.css";
import tabledata from '../api/tabledata';
import _ from 'lodash';
import '../styles/intabs.css';

class MainContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pane: {
        title: 'text_workflow',
        lastModified: {user: "admin", time: "2016-10-31 15:27:59"},
        state: "dispatching",
        key: '1'
      },
      sortedInfo: null,
      advConf: false
    }
  }

  handleChangeTab = (key) => {
    console.log(key);
  }

  handleChangeTable = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      sortedInfo: sorter
    });
  }

  mySorter = (sorter, a, b) => {
    let result = 0;
    let aa = typeof a[sorter.field] ==="string" ? a[sorter.field].toLowerCase() : a[sorter.field];
    let bb = typeof b[sorter.field] ==="string" ? b[sorter.field].toLowerCase() : b[sorter.field];
    if (aa < bb) {
      result = -1;
    } else {
      result = 1;
    }
    return result;
  }

  renderStatus = (text) => {
    switch (text) {
      case 'running':
        return <Tag color="#72C4E2">{text}</Tag>
      case 'success':
        return <Tag color="#1AB394">{text}</Tag>
      case 'suspend':
        return <Tag color="#F8AC59">{text}</Tag>
      case 'killd':
        return <Tag color="#ED5565">{text}</Tag>
      default:
        return <Tag color="#1AB394">{text}</Tag>
    }
  }

  handleAdvConf = e => {
    this.setState({
      advConf: !this.state.advConf
    });
  }

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  handleUpload = e => {
    console.log("handleUpload");
  }
  
  render() {
    let { pane, sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const columns = [{
      title: '节点运行编号',
      dataIndex: 'nodeNum',
      key: 'nodeNum',
      render: text => <a href="#">{text}</a>,
      sorter: (a, b) => this.mySorter(sortedInfo, a, b),//(a, b) => a.nodeNum - b.nodeNum
      sortOrder: sortedInfo.columnKey === 'nodeNum' && sortedInfo.order,
    }, {
      title: '工作流运行编号',
      dataIndex: 'workNum',
      key: 'workNum',
      sorter: (a, b) => this.mySorter(sortedInfo, a, b),
      sortOrder: sortedInfo.columnKey === 'workNum' && sortedInfo.order,
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: text => {
        let statusTag = null;
        switch (text) {
          case 'running':
            statusTag = <Tag color="#72C4E2">{text}</Tag>
            break
          case 'success':
            statusTag = <Tag color="#1AB394">{text}</Tag>
            break
          case 'suspend':
            statusTag = <Tag color="#F8AC59">{text}</Tag>
            break
          case 'killed':
            statusTag = <Tag color="#ED5565">{text}</Tag>
            break
          default:
            statusTag = <Tag color="#1AB394">{text}</Tag>
        }
        return statusTag
      },
      sorter: (a, b) => this.mySorter(sortedInfo, a, b),
      sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
    }, {
      title: '执行用户',
      dataIndex: 'executor',
      key: 'executor',
      sorter: (a, b) => this.mySorter(sortedInfo, a, b),
      sortOrder: sortedInfo.columnKey === 'executor' && sortedInfo.order,
    }];
    const gutter = 38, leftCols = 6, rightCols = 14, subLeftCols = 4;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const formItemLayoutSp = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
    };
    const { getFieldDecorator } = this.props.form;
    const advConfClass = classNames("form-title", "form-title-addon", this.state.advConf ? "form-title-addon-open" : "form-title-addon-close");
    const advConfShow = classNames(this.state.advConf ? "form-adv-conf-show" : "form-adv-conf-hide");
    return (
      <div>
        <div className="base-content">
          <span className="base-content-text">最后修改人：{pane.lastModified.user}</span>
          <span className="base-content-text">最后修改时间：{pane.lastModified.time}</span>
          <span className="base-content-text">状态：{pane.state}</span>
          {/*<BoardTop />*/}
        </div>
        <Tabs onChange={this.handleChangeTab} type="card">
          <TabPane tab="运行历史" key="1">
            <Table
              rowKey = 'nodeNum'
              columns={columns} 
              dataSource={tabledata} 
              bordered
              onChange={this.handleChangeTable}
            />
          </TabPane>
          <TabPane tab="节点配置" key="2">
            <Form className="form-node-config">
              <Row gutter={gutter} style={{margin: 15}}>
                <Col span={leftCols}><div className="form-title">基本信息</div></Col>
              </Row>
              <FormItem {...formItemLayout} label="所属目录">
                <Select defaultValue="测试任务" disabled>
                  <Option value="测试任务">测试任务</Option>
                </Select>
              </FormItem>
              <FormItem {...formItemLayout} label="类型">
                <Select defaultValue="测试任务" disabled>
                  <Option value="Hive">Hive</Option>
                </Select>
              </FormItem>
              <FormItem {...formItemLayout} label="名称">
                <Input type="text" value="Hive测试" disabled={true}/>
              </FormItem>
              <FormItem {...formItemLayout} label="描述">
                <Input type="textarea" value="测试的例子" disabled={true}/>
              </FormItem>
              <Row gutter={gutter} style={{margin: 15}}>
                <Col span={leftCols}><div className="form-title">基本属性</div></Col>
              </Row>
              <FormItem {...formItemLayout} label="脚本文件">
                <Input type="text" value="/home/test/hive/1" disabled={true}/>
              </FormItem>
              <FormItem
                {...formItemLayoutSp}
              >
                {getFieldDecorator('upload', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Upload name="logo" action="/upload.do" onChange={this.handleUpload}>
                    <div className="form-ctrl-title">+ Hive参数</div>
                  </Upload>
                )}
              </FormItem>
              <Row gutter={gutter} style={{margin: 15}}>
                <Col span={leftCols}><div className={advConfClass} onClick={this.handleAdvConf}>高级配置</div></Col>
              </Row>
              <div className={advConfShow}>
                <Row gutter={gutter} style={{margin: 15}}>
                  <Col offset={subLeftCols}><div className="form-sub-title" onClick={this.handleAdvConf}>+运行前操作</div></Col>
                </Row>
                <Row gutter={gutter} style={{margin: 15}}>
                  <Col offset={subLeftCols}><div className="form-sub-title" onClick={this.handleAdvConf}>+集群属性</div></Col>
                </Row>
                <Row gutter={gutter} style={{margin: 15}}>
                  <Col offset={subLeftCols}><div className="form-sub-title" onClick={this.handleAdvConf}> 重试</div></Col>
                </Row>
              </div>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

const WrappedMainContent = Form.create()(MainContent);

export default WrappedMainContent;