import { combineReducers } from 'redux';

const defaultState = {
  menus: [
    {'工作流开发': [{'4G业务': ['text_workflow', 'text_phone']}, {'宽带业务': ['21','22']}, {'信令': [{"二级目录": [{"三级目录": ['工作流']}]}]}]},
    {'回收站': [{'d1':['d1.1','d1.2']}]}
  ],
  openStatus: {},
	itemSelected: false,
  selectKey: null,
  search: '',
  searchResults: [],
  parsedRes: {},
  contextInfo: null,
  contextOperate: '',
  contextObjectName:''
};

const reducer = (state=defaultState, action) => {
  switch (action.type) {
    // case 'PARSEDMENU':
    //   return Object.assign({}, {
    //     ...state,
    //     parsedRes: action.data,
    //     contextInfo: null,
    //     contextObjectName: ''
    //   })
    case 'CHANGEMENU':
      return Object.assign({}, {
        ...state,
        menus: action.data,
        contextInfo: null,
        contextOperate: '',
        contextObjectName: ''
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
          contextInfo: null,
          contextObjectName:''
        })
      // }
    case 'OPEN':
        return Object.assign({}, {
          ...state,
          openStatus: {
            ...state.openStatus,
            [action.data]: !state.openStatus[action.data]
          },
          contextInfo: null,
          contextObjectName:''
        })
    case 'SEARCH':
      return Object.assign({}, {
        ...state,
        search: action.data,
        contextInfo: null,
        contextObjectName:''
      })
    case 'SEARCHRESULTS':
      return Object.assign({}, {
        ...state,
        searchResults: action.data,
        contextInfo: null,
        contextObjectName:''
      })
    case 'DELETESEARCHITEM':
      let tmpSearchResults = state.searchResults.slice(0);
      tmpSearchResults.splice(action.data,1);
      return Object.assign({}, {
        ...state,
        searchResults: tmpSearchResults,
        contextInfo: null,
        contextObjectName:''
      })
    case 'CONTEXTITEM':
      return Object.assign({}, {
        ...state,
        contextInfo: action.data,//include path & contextType
        contextObjectName:''
      })
    case 'CONTEXTOPERATE':
      return Object.assign({}, {
        ...state,
        contextInfo: {
          ...state.contextInfo,//the path is still useful
          contextType: ''
        },
        contextOperate: action.data,
        contextObjectName:''
      })
    case 'ADDFILE':
      return Object.assign({}, {
        ...state,
        contextInfo: {
          ...state.contextInfo,//the path is still useful
          contextType: ''
        },
        // contextOperate: action.data,////the operate is still useful
        contextObjectName: action.data,
      })
    default:
      return state
  }
}



// const reducer = combineReducers({});

export default reducer;