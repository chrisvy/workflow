// import { combineReducers } from 'redux';

const defaultState = {
  menus: {
    '工作流开发': {'4G业务': ['text_workflow', 'text_phone'], '宽带业务': ['21','22'], '信令': []},
    '回收站': {'d1':['d1.1','d1.2']},
    '其他': {}
  },
  menuStatus: {},
  subMenuStatus: {},
  topMenuStatus: {},
	itemSelected: false,
  selectKey: null,
  search: ''
};

const reducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'SELECT':
      if (state.selectKey === action.data) {
      	return Object.assign({}, {
          ...state,
          menuStatus: {},
        	itemSelected: false,
      		selectKey: null
        })
      } else {
      	return Object.assign({}, {
          ...state,
          menuStatus: {},
        	itemSelected: true,
      		selectKey: action.data
        })
      }
    case 'OPEN':
      // const first = action.data.indexOf('l');
      let last = action.data.lastIndexOf('l');
      if (0 === last) {
        return Object.assign({}, {
          ...state,
          menuStatus: {},
          topMenuStatus: {...state.topMenuStatus, [action.data]: !state.topMenuStatus[action.data]},
        })
      } else {
        return Object.assign({}, {
          ...state,
          menuStatus: {},
          subMenuStatus: {...state.subMenuStatus, [action.data]: !state.subMenuStatus[action.data]},
          topMenuStatus: {...state.topMenuStatus, [action.data.slice(0, last)]: !state.topMenuStatus[action.data]},
        })
      }
    case 'SEARCH':
      return Object.assign({}, {
        ...state,
        menuStatus: {},
        subMenuStatus: {},
        topMenuStatus: {},
        search: action.data,
        itemSelected: false,
        selectKey: null
      })
    case 'SEARCHKEY':
      const data = action.data.slice(1, action.data.length-1);
      last = data.lastIndexOf('l');
      const sub = data.slice(0, last);
      const second = sub.lastIndexOf('l');
      const top = sub.slice(0, second);
      return Object.assign({}, {
        ...state,
        menuStatus: {...(state.menuStatus), [data]: true},
        subMenuStatus: {...(state.subMenuStatus), [sub]: true},
        topMenuStatus: {...(state.topMenuStatus), [top]: true},
      })
    default:
      return state
  }
}



// const reducer = combineReducers({});

export default reducer;