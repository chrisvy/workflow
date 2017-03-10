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

export default cascaderReducer
