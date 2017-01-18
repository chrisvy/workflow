import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Radio, Checkbox, InputNumber } from 'antd';
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
import { cronTab, cronRadio, cronAddon } from '../actions/cronmakerAction';
import './modals.css';

class Cronmaker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 1,
      radioValue1: "",
      checkboxVisible1: false,
      checkNum1: 0,
      checkboxValue1: {},
      radioValue2: "",
      checkboxVisible2: false,
      checkboxValue2: {},
      checkNum2: 0,
      radioValue3: "",
      checkboxVisible3: false,
      checkboxValue3: {},
      checkNum3: 0,
      radioValue4: "",
      checkboxVisible4: false,
      checkboxValue4: {},
      checkNum4: 0,
    }
  }

  handleTabsChange = (key) => {
    // this.setState({
    //   tabIndex: e.target.value //wrong
    // });
    console.log(key);
    this.props.dispatch(cronTab(key));
  }

  handleRadioChange1 = (e) => {
    this.setState({
      radioValue1: e.target.value
    });
    if (e.target.value === 4) {
      this.setState({
        checkboxVisible1: true
      });
    } else {
      this.setState({
        checkboxVisible1: false
      });
    }
    this.props.dispatch(cronRadio(e.target.value));
  }

  handleCheckboxChange1 = (e) => {
    //e.target.checked
    if (e.target.checked) {
      checkboxValue1[e.target.value] = false;
    } else {
      checkboxValue1[e.target.value] = true;
    }
  }

  handleRadioChange2 = (e) => {
    this.setState({
      radioValue2: e.target.value
    });
    if (e.target.value === 4) {
      this.setState({
        checkboxVisible2: true
      });
    } else {
      this.setState({
        checkboxVisible2: false
      });
    }
  }

  handleCheckboxChange2 = (e) => {
    //e.target.checked
    if (e.target.checked) {
      checkboxValue2[e.target.value] = false;
    } else {
      checkboxValue2[e.target.value] = true;
    }
  }

  handleRadioChange3 = (e) => {
    this.setState({
      radioValue3: e.target.value
    });
    if (e.target.value === 4) {
      this.setState({
        checkboxVisible3: true
      });
    } else {
      this.setState({
        checkboxVisible3: false
      });
    }
  }

  handleCheckboxChange3 = (e) => {
    //e.target.checked
    if (e.target.checked) {
      checkboxValue3[e.target.value] = false;
    } else {
      checkboxValue3[e.target.value] = true;
    }
  }

  handleRadioChange4 = (e) => {
    this.setState({
      radioValue4: e.target.value
    });
    if (e.target.value === 4) {
      this.setState({
        checkboxVisible4: true
      });
    } else {
      this.setState({
        checkboxVisible4: false
      });
    }
  }

  handleCheckboxChange4 = (e) => {
    //e.target.checked
    if (e.target.checked) {
      checkboxValue4[e.target.value] = false;
    } else {
      checkboxValue4[e.target.value] = true;
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const timeNum = 5;
    const { currTab, minute, hour, day, week, month, year } = nextProps;
    console.log(currTab, minute, hour, day, week, month, year);
    //
    const dateObj = new Date();
    let dateTime = dateObj.getTime();//毫秒数
    let dateArr = [];
    if (currTab === "minute") {
      if (minute.cronRadio === "every") {
        for (let index=0; index<timeNum; index++) {
          dateArr.push(dateTime);
          dateTime += 1000;
        }
      } else if (minute.cronRadio === "fromTo") {
        const oriMins = dateObj.getMinutes();
        if (this.refs.minStart <= oriMins && oriMins <= this.refs.minEnd) {
          let pureTime = dateTime - oriMins*60*1000;
          for (let index=0; index<timeNum; index++) {
            dateArr.push(dateTime);
            dateTime += 1000;
          }
        } else if (this.refs.minStart <= dateTime && dateTime <= this.refs.minEnd) {
          for (let index=0; index<timeNum; index++) {
            dateArr.push(dateTime);
            dateTime += 1000;
            if (this.refs.minStart <= dateTime && dateTime <= this.refs.minEnd) {
              
            }
          }
        }
      }
    }
    this.setState({
      cronResults: dateArr
    });
  }

  render() {

    const { currTab, minute, hour, day, week, month, year } = this.props;
    let minsArr = [];
    for (let index=0; index<60; index++) {
      if (index<10) {
        minsArr.push("0" + index);
      } else {
        minsArr.push("" + index);
      }
    }

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    const handleCheckboxChange1 = this.handleCheckboxChange1;
    const handleCheckboxChange2 = this.handleCheckboxChange2;

    return (
      <div className="my-cronmaker">
        <Tabs defaultActiveKey="minute" onChange={this.handleTabsChange}>
          <TabPane tab="分钟" key="minute">
            <RadioGroup onChange={this.handleRadioChange1} value={this.state.radioValue1}>
              <Radio style={radioStyle} value="every">每分钟</Radio>
              <Radio style={radioStyle} value="fromTo">周期 从<InputNumber min={0} max={59} ref="minStart" />-<InputNumber min={0} max={59} ref="minEnd" />分钟</Radio>
              <Radio style={radioStyle} value="cycle">从<InputNumber min={0} max={59} ref="minBase" />分钟开始，每<InputNumber min={1} ref="minCycle" />分钟执行一次</Radio>
              <Radio style={radioStyle} value="specify">
                指定
              </Radio>
            </RadioGroup>
            {
              this.state.checkboxVisible1 && <div className="my-checkbox-group">
                {
                  minsArr.map(function(item, index) {
                    return <Checkbox key={item} onChange={handleCheckboxChange1} >{item}</Checkbox>
                  })
                }
              </div>
            }
          </TabPane>
          <TabPane tab="小时" key="hour">
            <RadioGroup onChange={this.handleRadioChange2} value={this.state.radioValue2}>
              <Radio style={radioStyle} value={1}>每小时</Radio>
              <Radio style={radioStyle} value={2}>周期 从<InputNumber min={0} max={23} />-<InputNumber min={0} max={23} />小时</Radio>
              <Radio style={radioStyle} value={3}>从<InputNumber min={0} max={23} />小时开始，每<InputNumber min={1} />小时执行一次</Radio>
              <Radio style={radioStyle} value={4}>
                指定
              </Radio>
            </RadioGroup>
            {
              this.state.checkboxVisible2 && <div className="my-checkbox-group">
                {
                  minsArr.slice(0,24).map(function(item, index) {
                    return <Checkbox key={item} onChange={handleCheckboxChange2} >{item}</Checkbox>
                  })
                }
              </div>
            }
          </TabPane>
          <TabPane tab="日" key="day">
            <RadioGroup onChange={this.handleRadioChange3} value={this.state.radioValue3}>
              <Radio style={radioStyle} value={1}>每日</Radio>
              <Radio style={radioStyle} value={2}>不指定</Radio>
              <Radio style={radioStyle} value={3}>周期 从<InputNumber min={1} max={31} />-<InputNumber min={1} max={31} />小时</Radio>
              <Radio style={radioStyle} value={4}>从<InputNumber min={1} max={31} />日开始，每<InputNumber min={1} />天执行一次</Radio>
              <Radio style={radioStyle} value={5}>每月<InputNumber min={1} max={31} />号最近的那个工作日</Radio>
              <Radio style={radioStyle} value={6}>本月最后一天</Radio>
              <Radio style={radioStyle} value={7}>
                指定
              </Radio>
            </RadioGroup>
            {
              this.state.checkboxVisible3 && <div className="my-checkbox-group">
                {
                  minsArr.slice(1,33).map(function(item, index) {
                    return <Checkbox key={item} onChange={handleCheckboxChange3} >{item}</Checkbox>
                  })
                }
              </div>
            }
          </TabPane>
          <TabPane tab="月" key="month">
            <RadioGroup onChange={this.handleRadioChange4} value={this.state.radioValue4}>
              <Radio style={radioStyle} value={1}>每月</Radio>
              <Radio style={radioStyle} value={2}>周期 从<InputNumber min={1} max={12} />-<InputNumber min={1} max={12} />月</Radio>
              <Radio style={radioStyle} value={3}>从<InputNumber min={1} max={12} />月开始，每<InputNumber min={1} />月执行一次</Radio>
              <Radio style={radioStyle} value={4}>
                指定
              </Radio>
            </RadioGroup>
            {
              this.state.checkboxVisible4 && <div className="my-checkbox-group">
                {
                  minsArr.slice(1,14).map(function(item, index) {
                    return <Checkbox key={item} onChange={handleCheckboxChange4} >{item}</Checkbox>
                  })
                }
              </div>
            }
          </TabPane>
          <TabPane tab="周" key="week">
            <RadioGroup onChange={this.handleRadioChange4} value={this.state.radioValue4}>
              <Radio style={radioStyle} value={1}>每周</Radio>
              <Radio style={radioStyle} value={2}>不指定</Radio>
              <Radio style={radioStyle} value={3}>周期 从星期<InputNumber min={1} max={31} />-<InputNumber min={1} max={31} /></Radio>
              <Radio style={radioStyle} value={4}>第<InputNumber min={1} max={4} />周的星期<InputNumber min={1} max={7} /></Radio>
              <Radio style={radioStyle} value={5}>本月最后一个星期<InputNumber min={1} max={7} /></Radio>
              <Radio style={radioStyle} value={6}>
                指定
              </Radio>
            </RadioGroup>
            {
              this.state.checkboxVisible4 && <div className="my-checkbox-group">
                {
                  minsArr.slice(1,7).map(function(item, index) {
                    return <Checkbox key={item} onChange={handleCheckboxChange4} >{item}</Checkbox>
                  })
                }
              </div>
            }
          </TabPane>
          <TabPane tab="年" key="year">
            <RadioGroup onChange={this.handleRadioChange4} value={this.state.radioValue4}>
              <Radio style={radioStyle} value={1}>每年</Radio>
              <Radio style={radioStyle} value={2}>周期 从<InputNumber min={2017} max={3017} />-<InputNumber min={2017} max={3017} /></Radio>
            </RadioGroup>
          </TabPane>
        </Tabs>

      </div>
    );
  }

}

const mapStateToProps = state => {
  const { cronmakerReducer: { currTab, minute, hour, day, week, month, year } } = state;
  return { currTab, minute, hour, day, week, month, year };
}

export default connect(mapStateToProps)(Cronmaker);
