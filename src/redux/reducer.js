// import { combineReducers } from 'redux';

const defaultState = {
  menus: [
    {'工作流开发': [{'4G业务': ['text_workflow', 'text_phone']}, {'宽带业务': ['21','22']}, {'信令': [{"二级目录": [{"三级目录": ['工作流']}]}]}]},
    {'回收站': [{'d1':['d1.1','d1.2']}]}
  ],
	itemSelected: false,
  selectKey: null,
  search: '',
  searchResults: [],
  parsedRes: {},
  contextInfo: null
};

const reducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'PARSEDMENU':
      return Object.assign({}, {
        ...state,
        parsedRes: action.data,
        contextInfo: null
      })
    case 'SELECT':
      // if (state.selectKey === action.data) {
      // 	return Object.assign({}, {
      //     ...state,
      //   	itemSelected: false,
      // 		selectKey: null
      //   })
      // } else {
      	return Object.assign({}, {
          ...state,
        	itemSelected: true,
      		selectKey: action.data,
          contextInfo: null
        })
      // }
    case 'SEARCH':
      return Object.assign({}, {
        ...state,
        search: action.data,
        contextInfo: null
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
        contextInfo: null
      })
    case 'DELETESEARCHITEM':
      let tmpSearchResults = state.searchResults.slice(0);
      console.log('he1', action.data, tmpSearchResults)
      tmpSearchResults.splice(action.data,1);
      console.log('he2', tmpSearchResults);
      return Object.assign({}, {
        ...state,
        searchResults: tmpSearchResults,
        contextInfo: null
      })
    case 'CONTEXTITEM':
      return Object.assign({}, {
        ...state,
        contextInfo: action.data,
      })
    default:
      return state
  }
}



// const reducer = combineReducers({});

export default reducer;