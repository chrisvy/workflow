import { combineReducers } from 'redux';

const menuDefaultState = {
  menus: [
    {'工作流开发': [{'4G业务': ['text_workflow', 'text_phone']}, {'宽带业务': ['21','22']}, {'信令': [{"二级目录": [{"三级目录": ['工作流']}]}]}]},
    {'回收站': [{'d1':['d1.1','d1.2']}]}
  ],
  parsedRes: null,
  openStatus: {},
	itemSelected: false,
  selectKey: null
};

const menuReducer = (state=menuDefaultState, action) => {
  switch (action.type) {
    case 'PARSEDMENU':
      return Object.assign({}, {
        ...state,
        parsedRes: action.data,
        contextInfo: null,
        contextObjectName: ''
      })
    case 'CHANGEMENU':
      return Object.assign({}, {
        ...state,
        menus: action.data
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
        })
      // }
    case 'OPEN':
        return Object.assign({}, {
          ...state,
          openStatus: {
            ...state.openStatus,
            [action.data]: !state.openStatus[action.data]
          }
        })
    
    
    default:
      return state
  }
}

const searchDefaultState = {
  search: '',
  searchResults: []
};

const searchReducer = (state=searchDefaultState, action) => {
  switch (action.type) {
    case 'SEARCH':
      return Object.assign({}, {
        ...state,
        search: action.data,
      })
    case 'SEARCHRESULTS':
      return Object.assign({}, {
        ...state,
        searchResults: action.data
      })
    case 'DELETESEARCHITEM':
      let tmpSearchResults = state.searchResults.slice(0);
      tmpSearchResults.splice(action.data,1);
      return Object.assign({}, {
        ...state,
        searchResults: tmpSearchResults
      })
    default:
      return state
  }
}

const menuConDefaultState = {
  contextInfo: null,
  contextOperate: '',
  contextObjectName:'',
  contextButton: false
};

const menuConReducer = (state=menuConDefaultState, action) => {
  switch (action.type) {
    case 'CONTEXTITEM':
      return Object.assign({}, {
        ...state,
        contextInfo: action.data,//include path & contextType
        contextObjectName:'',
        contextButton: true
      })
    case 'CONTEXTOPERATE':
      return Object.assign({}, {
        ...state,
        contextInfo: {
          ...state.contextInfo,//the path is still useful
          contextType: ''
        },
        contextOperate: action.data,
        contextObjectName:'',
        contextButton: false
      })
    case 'ADDDIR':
      return Object.assign({}, {
        ...state,
        contextInfo: {
          ...state.contextInfo,//the path is still useful
          contextType: ''
        },
        // contextOperate: action.data,////the operate is still useful
        contextObjectName: action.data,
        contextButton: true
      })
    default:
      return state
  }
}


const reducer = combineReducers({
  menuReducer,
  searchReducer,
  menuConReducer
});

export default reducer;