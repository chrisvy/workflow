const menuConDefaultState = {
  contextInfo: {
    path: ''
  },
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

export default menuConReducer
