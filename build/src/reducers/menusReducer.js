import folder from '../api/folder';
const menus = folder.data;
const openStatusInitial = {//改值应该在获取到folder数据之后，menus中不同category对应data的长度设置
  '0-0-0': true,
  '0-1-0': true,
  '1-0-0': true,
  '1-0-1': true
};
const menusDefaultState = {
  menus: menus,
  menuTab: "0-0",
  parsedRes: {},
  openStatus: openStatusInitial,
	itemSelected: false,
  selectKey: null,
  //控制Tab栏部分
  selectedTabs: [],//选中的标签数组，传入tabs组件中
  selectedTabIds: [],
  activeIndex: null,
  closeTab: null,
  contextMenuShow: {
    menuShow: false,
    x: 0,
    y: 0
  },
  contextInfo: {
    path: ''
  },
  contextOperate: '',
  newObject: null,
  contextButton: false
};

const menusReducer = (state=menusDefaultState, action) => {
	let alreadyIndex;
  switch (action.type) {
    case 'CONTEXTITEM':
      return Object.assign({}, {
        ...state,
        contextInfo: action.data,//include path & id & text & contextType
        contextOperate: '',
        newObject:'',
        contextButton: false
      })
    case 'CONTEXTOPERATE':
    	if (action.data === "closeOthers") {
        return Object.assign({}, {
          ...state,
          selectedTabs: [state.contextInfo.path],//选中的标签数组，传入tabs组件中
          selectedTabIds: [state.contextInfo.id],
          activeIndex: 0,
          closeTab: null
        })
      } else if (action.data === "closeAll") {
        return Object.assign({}, {
          ...state,
          selectedTabs: [],//选中的标签数组，传入tabs组件中
          selectedTabIds: [],
          activeIndex: null,
          closeTab: null
        })
      } else {
      	return Object.assign({}, {
	        ...state,
	        contextInfo: {
	          ...state.contextInfo,//the path & id & text is still useful
	          contextType: ''
	        },
	        contextOperate: action.data,
	        newObject:'',
	        contextButton: false
	      })
      }
    case 'ADDDIR':
      return Object.assign({}, {
        ...state,
        contextInfo: {
          ...state.contextInfo,//the path & text is still useful
          contextType: ''
        },
        // contextOperate: action.data,////the operate is still useful
        newObject: action.data,
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
        newObject: action.data,
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
        newObject: action.data,
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
        newObject: ["delete"],
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
        newObject: ["back"],
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
        newObject: ["remove"],
        contextButton: true
      })
    case 'CONTEXTCLOSEITEM':
      return Object.assign({}, {
        ...state,
        closeTab: action.data//(path, text, contextType)
      })
    case 'CONTEXTMENUSHOW':
      return Object.assign({}, {
        ...state,
        contextMenuShow: action.data,//(x, y menuShow)
        newObject: '',
      })
    case 'MENUTAB':
      return Object.assign({}, {
        ...state,
        menuTab: action.data,
        newObject: '',
        closeTab: null
      })
    case 'PARSEDMENU':
      return Object.assign({}, {
        ...state,
        parsedRes: action.data,
        newObject: '',
        closeTab: null
      })
    case 'CHANGEMENU':
      return Object.assign({}, {
        ...state,
        menus: action.data,
        closeTab: null
      })
    case 'SELECT':
      alreadyIndex = state.selectedTabs.findIndex(x => x===action.data);
      if (alreadyIndex !== -1) {//新点击的工作流打开过
        return Object.assign({}, {
          ...state,
          itemSelected: true,
          selectKey: action.data,
          activeIndex: alreadyIndex,
          closeTab: null
        })
      } else {//新点击的工作流没打开过
        return Object.assign({}, {
          ...state,
          itemSelected: true,
          selectKey: action.data,
          activeIndex: state.selectedTabs.length,
          selectedTabs:  action.text !== null ? [...state.selectedTabs, action.data] : state.selectedTabs,
          selectedTabIds: action.text !== null ? [...state.selectedTabIds, action.id] : state.selectedTabs,
          closeTab: null
        })
      }
    case 'CHANGETAB':
      return Object.assign({}, {
        ...state,
        selectKey: action.path,
        activeIndex: action.data,
        closeTab: null
      })
    case 'REARRANGETAB':
      return Object.assign({}, {
        ...state,
        selectedTabs: action.data.newSelectedTabs,
        selectedTabIds: action.data.newSelectedTabIds,
        activeIndex: action.data.newActiveIndex,
        closeTab: null
      })
    case 'CLOSETAB':
      let newActive;
      if (action.data === state.activeIndex && 0 === state.activeIndex) {
        newActive = 0;
      } else if (action.data <= state.activeIndex) {
        newActive = state.activeIndex - 1;
      } else {
        newActive = state.activeIndex;
      }
      let selectedTabs = Array.from(state.selectedTabs);
      selectedTabs.splice(action.data, 1);
      let selectedTabIds = Array.from(state.selectedTabIds);
      selectedTabIds.splice(action.data, 1);
      return Object.assign({}, {
        ...state,
        selectKey: action.data,
        activeIndex: newActive,
        selectedTabs: selectedTabs,
        selectedTabIds: selectedTabIds,
        closeTab: null
      })
    case 'OPEN':
      return Object.assign({}, {
        ...state,
        openStatus: {
          ...state.openStatus,
          [action.data]: !state.openStatus[action.data]
        },
        closeTab: null
      })
    default:
      return state
  }
}

export default menusReducer
