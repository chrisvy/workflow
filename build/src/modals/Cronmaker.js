import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Radio, Checkbox, InputNumber } from 'yo-component';
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
import { cronMin, cronHour, cronDay, cronMonth, cronWeek, cronYear } from '../actions/cronmakerAction';
import '../styles/modals.css';

class Cronmaker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      //-------min-------
      minRadioValue: "every",
      minCheckboxVisible: false,
      minCheckboxValue: [],
      minStart: 1,
      minEnd: 2,
      minBase: 0,
      minCycle: 1,
      minData: '',
      //-------hour-------
      hourRadioValue: "every",
      hourCheckboxVisible: false,
      hourCheckboxValue: [],
      hourStart: 1,
      hourEnd: 2,
      hourBase: 0,
      hourCycle: 1,
      hourData: '',
      //-------day-------
      dayRadioValue: "every",
      dayCheckboxVisible: false,
      dayCheckboxValue: [],
      dayStart: 1,
      dayEnd: 2,
      dayBase: 0,
      dayCycle: 1,
      dayNearWork: 1,//每月最近的那个工作日
      dayData: '',
      //-------month-------
      monthRadioValue: "every",
      monthCheckboxVisible: false,
      monthCheckboxValue: [],
      monthStart: 1,
      monthEnd: 2,
      monthBase: 0,
      monthCycle: 1,
      monthData: '',
      //-------week-------
      weekRadioValue: "every",
      weekCheckboxVisible: false,
      weekCheckboxValue: [],
      weekStart: 1,
      weekEnd: 2,
      weekBase: 0,
      weekCycle: 1,
      weekNth: 1,
      weekNDay: 1,//第几周的星期几
      weekN: 1,//本月的最后一个星期几
      weekData: '',
      //-------year-------
      yearRadioValue: "every",
      yearCheckboxVisible: false,
      yearCheckboxValue: [],
      yearStart: 1,
      yearEnd: 2,
      yearBase: 0,
      yearCycle: 1,
      yearData: '',
    }
  }

  handleTabsChange = (key) => {
    console.log("handleTabsChange", key);
  }

  handleCheckboxChange = (type) => (checkValues) => {
    this.setState({
      ...this.state,
      [type + "CheckboxValue"]: checkValues
    })
  }

  handleRadioChange = (type) => (e) => {
    this.setState({
      [type + "RadioValue"]: e.target.value
    });
    switch (e.target.value) {
      case "every":
        return this.setState({
          [type + "Data"]: '*',
          [type + "CheckboxVisible"]: false
        })
      case "unspecify":
        return this.setState({
          [type + "Data"]: '?',
          [type + "CheckboxVisible"]: false
        })
      case "fromTo":
        return this.setState({
          [type + "Data"]: this.state[type + "Start"] + '-' + this.state[type + "End"],
          [type + "CheckboxVisible"]: false
        })
      case "cycle":
        return this.setState({
          [type + "Data"]: this.state[type + "Base"] + '/' + this.state[type + "Cycle"],
          [type + "CheckboxVisible"]: false
        })
      case "workday"://每月最近的那个工作日
        return this.setState({
          [type + "Data"]: this.state.dayNearWork + 'W',
          [type + "CheckboxVisible"]: false
        })
      case "lastday":
        return this.setState({
          [type + "Data"]: 'L',
          [type + "CheckboxVisible"]: false
        })
      case "specify":
        const checkboxValue = this.state[type + "CheckboxValue"];
        if (checkboxValue.length) {
          return this.setState({
            [type + "Data"]: checkboxValue.join(','),
            [type + "CheckboxVisible"]: true
          })
        } else {
          return this.setState({
            [type + "Data"]: '?',
            [type + "CheckboxVisible"]: true
          })
        }
      case "weekOfMonth"://本月的最后一个星期几
        return this.setState({
          [type + "Data"]: this.state.weekN + 'L',
          [type + "CheckboxVisible"]: false
        })
      case "yearUnspecify":
        return this.setState({
          [type + "Data"]: '',
          [type + "CheckboxVisible"]: false
        })
      case "weekCycle"://第几周的星期几
        return this.setState({
          [type + "Data"]: this.state.weekNth + '#' + this.state.weekNDay,
          [type + "CheckboxVisible"]: false
        })
      default:
        return
    }
  }

  componentWillReceiveProps = (nextProps) => {
    // const timeNum = 5;
    // const { currTab, minute, hour, day, week, month, year } = nextProps;
    // console.log(currTab, minute, hour, day, week, month, year);
    // //
    // const dateObj = new Date();
    // let dateTime = dateObj.getTime();//毫秒数
  }

  handleNumChange = (type) => (value) => {
    this.setState({
      [type]: value
    });
  }

  componentWillUpdate = (nextProps, nextState) => {
    // console.log("nextState", nextState);
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

    return (
      <div className="my-cronmaker">
        <Tabs defaultActiveKey="minute" onChange={this.handleTabsChange}>
          <TabPane tab="分钟" key="minute">
            <RadioGroup onChange={this.handleRadioChange("min")} value={this.state.minRadioValue}>
              <Radio style={radioStyle} value="every">每分钟</Radio>
              <Radio style={radioStyle} value="fromTo">周期 从<InputNumber min={0} max={59} onChange={this.handleNumChange("minStart")} defaultValue={1} />-<InputNumber min={0} max={59} onChange={this.handleNumChange("minEnd")} defaultValue={2} />分钟</Radio>
              <Radio style={radioStyle} value="cycle">从<InputNumber min={0} max={59} onChange={this.handleNumChange("minBase")} defaultValue={0} />分钟开始，每<InputNumber min={1} onChange={this.handleNumChange("minCycle")} defaultValue={1} />分钟执行一次</Radio>
              <Radio style={radioStyle} value="specify">
                指定
              </Radio>
            </RadioGroup>
            {
              this.state.minCheckboxVisible && <CheckboxGroup options={minsArr} onChange={this.handleCheckboxChange("min")} value={this.state.minCheckboxValue} />
            }
          </TabPane>
          <TabPane tab="小时" key="hour">
            <RadioGroup onChange={this.handleRadioChange("hour")} value={this.state.hourRadioValue}>
              <Radio style={radioStyle} value="every">每小时</Radio>
              <Radio style={radioStyle} value="fromTo">周期 从<InputNumber min={0} max={23} onChange={this.handleNumChange("hourStart")} defaultValue={1} />-<InputNumber min={0} max={23} onChange={this.handleNumChange("hourEnd")} defaultValue={2} />小时</Radio>
              <Radio style={radioStyle} value="cycle">从<InputNumber min={0} max={23} onChange={this.handleNumChange("hourBase")} defaultValue={0} />小时开始，每<InputNumber min={1} onChange={this.handleNumChange("hourCycle")} defaultValue={1} />小时执行一次</Radio>
              <Radio style={radioStyle} value="specify">
                指定
              </Radio>
            </RadioGroup>
            {
              this.state.hourCheckboxVisible && <CheckboxGroup options={minsArr.slice(0,24)} onChange={this.handleCheckboxChange("hour")} value={this.state.hourCheckboxValue} />
            }
          </TabPane>
          <TabPane tab="日" key="day">
            <RadioGroup onChange={this.handleRadioChange("day")} value={this.state.dayRadioValue}>
              <Radio style={radioStyle} value="every">每日</Radio>
              <Radio style={radioStyle} value="unspecify">不指定</Radio>
              <Radio style={radioStyle} value="fromTo">周期 从<InputNumber min={1} max={31} onChange={this.handleNumChange("dayStart")} defaultValue={1} />-<InputNumber min={1} max={31} onChange={this.handleNumChange("dayEnd")} defaultValue={2} />小时</Radio>
              <Radio style={radioStyle} value="cycle">从<InputNumber min={1} max={31} onChange={this.handleNumChange("dayBase")} defaultValue={0} />日开始，每<InputNumber min={1} onChange={this.handleNumChange("dayCycle")} defaultValue={1} />天执行一次</Radio>
              <Radio style={radioStyle} value="workday">每月<InputNumber min={1} max={31} onChange={this.handleNumChange("workday")} defaultValue={1} />号最近的那个工作日</Radio>
              <Radio style={radioStyle} value="lastday">本月最后一天</Radio>
              <Radio style={radioStyle} value="specify">
                指定
              </Radio>
            </RadioGroup>
            {
              this.state.dayCheckboxVisible && <CheckboxGroup options={minsArr.slice(1,32)} onChange={this.handleCheckboxChange("day")} value={this.state.dayCheckboxValue} />
            }
          </TabPane>
          <TabPane tab="月" key="month">
            <RadioGroup onChange={this.handleRadioChange("month")} value={this.state.monthRadioValue}>
              <Radio style={radioStyle} value="every">每月</Radio>
              <Radio style={radioStyle} value="fromTo">周期 从<InputNumber min={1} max={12} onChange={this.handleNumChange("monthStart")} defaultValue={1} />-<InputNumber min={1} max={12} onChange={this.handleNumChange("monthEnd")} defaultValue={2} />月</Radio>
              <Radio style={radioStyle} value="cycle">从<InputNumber min={1} max={12} onChange={this.handleNumChange("monthBase")} defaultValue={0} />月开始，每<InputNumber min={1} onChange={this.handleNumChange("monthCycle")} defaultValue={1} />月执行一次</Radio>
              <Radio style={radioStyle} value="specify">
                指定
              </Radio>
            </RadioGroup>
            {
              this.state.monthCheckboxVisible && <CheckboxGroup options={minsArr.slice(1,13)} onChange={this.handleCheckboxChange("month")} value={this.state.monthCheckboxValue} />
            }
          </TabPane>
          <TabPane tab="周" key="week">
            <RadioGroup onChange={this.handleRadioChange("week")} value={this.state.weekRadioValue}>
              <Radio style={radioStyle} value="every">每周</Radio>
              <Radio style={radioStyle} value="unspecify">不指定</Radio>
              <Radio style={radioStyle} value="fromTo">周期 从星期<InputNumber min={1} max={31} onChange={this.handleNumChange("weekStart")} defaultValue={1} />-<InputNumber min={1} max={31} onChange={this.handleNumChange("weekEnd")} defaultValue={2} /></Radio>
              <Radio style={radioStyle} value="weekCycle">第<InputNumber min={1} max={4} onChange={this.handleNumChange("weekNth")} defaultValue={1} />周的星期<InputNumber min={1} max={7} onChange={this.handleNumChange("weekNDay")} defaultValue={1} /></Radio>
              <Radio style={radioStyle} value="weekOfMonth">本月最后一个星期<InputNumber min={1} max={7} onChange={this.handleNumChange("weekn")} defaultValue={1} /></Radio>
              <Radio style={radioStyle} value="specify">
                指定
              </Radio>
            </RadioGroup>
            {
              this.state.weekCheckboxVisible && <CheckboxGroup options={minsArr.slice(1,8)} onChange={this.handleCheckboxChange("week")} value={this.state.weekCheckboxValue} />
            }
          </TabPane>
          <TabPane tab="年" key="year">
            <RadioGroup onChange={this.handleRadioChange("year")} value={this.state.yearRadioValue}>
              <Radio style={radioStyle} value="yearUnspecify">不指定</Radio>
              <Radio style={radioStyle} value="every">每年</Radio>
              <Radio style={radioStyle} value="fromTo">周期 从<InputNumber min={2017} max={3017} onChange={this.handleNumChange("yearStart")} defaultValue={2017} />-<InputNumber min={2017} max={3017} onChange={this.handleNumChange("yearEnd")} defaultValue={2018} /></Radio>
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
