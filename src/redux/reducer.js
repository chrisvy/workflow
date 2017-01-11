// import { combineReducers } from 'redux';

const defaultState = {
  menus: {
    '工作流开发': {'4G业务': ['text_workflow', 'text_phone'], '宽带业务': ['21','22'], '信令': []},
    '回收站': {'d1':['d1.1','d1.2']},
    '其他': {}
  },
	itemSelected: false,
  selectKey: null,
  search: '',
  searchResults: [],
};

const reducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'SELECT':
      if (state.selectKey === action.data) {
      	return Object.assign({}, {
          ...state,
        	itemSelected: false,
      		selectKey: null
        })
      } else {
      	return Object.assign({}, {
          ...state,
        	itemSelected: true,
      		selectKey: action.data
        })
      }
    case 'SEARCH':
      return Object.assign({}, {
        ...state,
        search: action.data,
      })
    case 'SEARCHRESULTS':
      // const data = action.data.slice(1, action.data.length-1);
      // last = data.lastIndexOf('l');
      // const sub = data.slice(0, last);
      // const second = sub.lastIndexOf('l');
      // const top = sub.slice(0, second);
      return Object.assign({}, {
        ...state,
        searchResults: action.data,
      })
    case 'DELETESEARCHITEM':
      let tmpSearchResults = state.searchResults.slice(0);
      console.log('he1', action.data, tmpSearchResults)
      tmpSearchResults.splice(action.data,1);
      console.log('he2', tmpSearchResults);
      return Object.assign({}, {
        ...state,
        searchResults: tmpSearchResults,
      })
    default:
      return state
  }
}



// const reducer = combineReducers({});

export default reducer;