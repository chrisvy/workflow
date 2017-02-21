const menuDefaultState = {
  menus: [
    {'工作流开发': [{'4G业务': ['text_workflow', 'text_phone', 'text_phone1', 'text_phone2', 'text_phone3', 'text_phone4', 'text_phone5', 'text_phone6', 'text_phone7']}, {'宽带业务': ['21','22']}, {'信令': [{"二级目录": [{"三级目录": ['工作流XXXXXXXXX']}]}]}]},
    {'回收站': ['d1']}
  ],
  parsedRes: null,
  openStatus: {
    '0': true,
    '1': true
  },
	itemSelected: false,
  selectKey: null,
  //控制Tab栏部分
  tmpIndex: null,//左侧树形栏点击一下，临时打开的标签栏
  selectedTabs: [],//选中的标签数组，传入tabs组件中
  activeIndex: null
};

const menuReducer = (state=menuDefaultState, action) => {
  let alreadyIndex;
  switch (action.type) {
    case 'PARSEDMENU':
      return Object.assign({}, {
        ...state,
        parsedRes: action.data,
        contextObjectName: '',
        tmpIndex: null
      })
    case 'CHANGEMENU':
      return Object.assign({}, {
        ...state,
        menus: action.data,
        tmpIndex: null
      })
    case 'SELECT':
      alreadyIndex = state.selectedTabs.findIndex(x => x===action.data);
      if (alreadyIndex !== -1) {//新点击的工作流打开过
        return Object.assign({}, {
          ...state,
          itemSelected: true,
          selectKey: action.data,
          activeIndex: alreadyIndex,
        })
      } else {//新点击的工作流没打开过
        if (state.tmpIndex !== null) {//有临时打开的Tab栏
          let selectedTabs = Array.from(state.selectedTabs);
          selectedTabs.splice(state.tmpIndex, 1, action.data);
          return Object.assign({}, {
            ...state,
            itemSelected: true,
            selectKey: action.data,
            activeIndex: state.tmpIndex,
            selectedTabs: selectedTabs
          })
        } else if (state.activeIndex !== null) {//没有临时打开的Tab，但有双击打开的Tab
          let selectedTabs = Array.from(state.selectedTabs);
          selectedTabs.splice(state.activeIndex + 1, 0, action.data)
          return Object.assign({}, {
            ...state,
            itemSelected: true,
            selectKey: action.data,
            tmpIndex: state.activeIndex + 1,
            activeIndex: state.activeIndex + 1,
            selectedTabs: selectedTabs
          })
        } else {//还没有打开过
          return Object.assign({}, {
            ...state,
            itemSelected: true,
            selectKey: action.data,
            tmpIndex: 0,
            activeIndex: 0,
            selectedTabs: [action.data]
          })
        }
      }
    case 'DBLSELECT':
      alreadyIndex = state.selectedTabs.findIndex(x => x===action.data);
      if (alreadyIndex !== -1) {//新点击的工作流打开过
        return Object.assign({}, {
          ...state,
          itemSelected: true,
          selectKey: action.data,
          tmpIndex: null,
          activeIndex: alreadyIndex,
        })
      } else {//新点击的工作流没打开过
        if (state.tmpIndex !== null) {//有临时打开的Tab栏
          let selectedTabs = Array.from(state.selectedTabs);
          selectedTabs.splice(state.tmpIndex, 1, action.data);
          return Object.assign({}, {
            ...state,
            itemSelected: true,
            selectKey: action.data,
            tmpIndex: null,
            activeIndex: state.tmpIndex,
            selectedTabs: selectedTabs
          })
        } else if (state.activeIndex !== null) {//没有临时打开的Tab，但有双击打开的Tab
          let selectedTabs = Array.from(state.selectedTabs);
          selectedTabs.splice(state.activeIndex + 1, 0, action.data)
          return Object.assign({}, {
            ...state,
            itemSelected: true,
            selectKey: action.data,
            tmpIndex: null,
            activeIndex: state.activeIndex + 1,
            selectedTabs: selectedTabs
          })
        } else {//还没有打开过
          return Object.assign({}, {
            ...state,
            itemSelected: true,
            selectKey: action.data,
            tmpIndex: null,
            activeIndex: 0,
            selectedTabs: [action.data]
          })
        }
      }
    case 'CHANGETAB':
      return Object.assign({}, {
        ...state,
        selectKey: action.path,
        activeIndex: action.data
      })
    case 'CLOSETAB':
      let newTmp, newActive;
      if (action.data === state.tmpIndex || null === state.tmpIndex) {
        newTmp = null;
      } else if (action.data < state.tmpIndex) {
        newTmp = state.tmpIndex - 1;
      } else {
        newTmp = state.tmpIndex;
      }
      if (action.data === state.activeIndex && 0 === state.activeIndex) {
        newActive = 0;
      } else if (action.data <= state.activeIndex) {
        newActive = state.activeIndex - 1;
      } else {
        newActive = state.activeIndex;
      }
      let selectedTabs = Array.from(state.selectedTabs);
      selectedTabs.splice(action.data, 1);
      return Object.assign({}, {
        ...state,
        selectKey: action.data,
        tmpIndex: newTmp,
        activeIndex: newActive,
        selectedTabs: selectedTabs
      })
    case 'OPEN':
      return Object.assign({}, {
        ...state,
        openStatus: {
          ...state.openStatus,
          [action.data]: !state.openStatus[action.data]
        },
        tmpIndex: null
      })
    default:
      return state
  }
}

export default menuReducer
