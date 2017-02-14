import { combineReducers } from 'redux';
import { cronmakerReducer } from './cronmakerReducer';

const menuDefaultState = {
  menus: [
    {'工作流开发': [{'4G业务': ['text_workflow', 'text_phone']}, {'宽带业务': ['21','22']}, {'信令': [{"二级目录": [{"三级目录": ['工作流XXXXXXXXX']}]}]}]},
    {'回收站': ['d1']}
  ],
  parsedRes: null,
  openStatus: {
    '0': true,
    '1': true
  },
	itemSelected: false,
  selectKey: null
};

const menuReducer = (state=menuDefaultState, action) => {
  switch (action.type) {
    case 'PARSEDMENU':
      return Object.assign({}, {
        ...state,
        parsedRes: action.data,
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
        contextInfo: action.data,//include path & text & contextType
        contextOperate: '',
        contextObjectName:'',
        contextButton: false
      })
    case 'CONTEXTOPERATE':
      return Object.assign({}, {
        ...state,
        contextInfo: {
          ...state.contextInfo,//the path & text is still useful
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
          ...state.contextInfo,//the path & text is still useful
          contextType: ''
        },
        // contextOperate: action.data,////the operate is still useful
        contextObjectName: action.data,
        contextButton: true
      })
    case 'ADDWORK':
      return Object.assign({}, {
        ...state,
        contextInfo: {
          ...state.contextInfo,//the path & text is still useful
          contextType: ''
        },
        // contextOperate: action.data,////the operate is still useful
        contextObjectName: action.data,
        contextButton: true
      })
    case 'CPWORK':
      return Object.assign({}, {
        ...state,
        contextInfo: {
          ...state.contextInfo,//the path & text is still useful
          contextType: ''
        },
        // contextOperate: action.data,////the operate is still useful
        contextObjectName: action.data,
        contextButton: true
      })
    case 'MVWORK'://删除工作流
      return Object.assign({}, {
        ...state,
        contextInfo: {
          ...state.contextInfo,//the path & text is still useful
          contextType: ''
        },
        // contextOperate: action.data,////the operate is still useful
        contextObjectName: ["delete"],
        contextButton: true
      })
    case 'BACKWORK'://还原工作流
      return Object.assign({}, {
        ...state,
        contextInfo: {
          ...state.contextInfo,//the path & text is still useful
          contextType: ''
        },
        // contextOperate: action.data,////the operate is still useful
        contextObjectName: ["back"],
        contextButton: true
      })
    case 'RMWORK'://彻底删除工作流
      return Object.assign({}, {
        ...state,
        contextInfo: {
          ...state.contextInfo,//the path & text is still useful
          contextType: ''
        },
        // contextOperate: action.data,////the operate is still useful
        contextObjectName: ["remove"],
        contextButton: true
      })
    default:
      return state
  }
}

const cascaderDefaultState = {
  openPath: ''
}

const cascaderReducer = (state=cascaderDefaultState, action) => {
  switch (action.type) {
    case 'CASCADERMENU':
      return Object.assign({}, {
        openPath: action.data
      })
    default:
      return state
  }
}

const reducer = combineReducers({
  menuReducer,
  searchReducer,
  menuConReducer,
  cascaderReducer,
  cronmakerReducer
});

export default reducer;