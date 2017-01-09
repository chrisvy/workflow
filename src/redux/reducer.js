const defaultState = {
	itemSelected: false,
  selectKey: null
};

const reducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'SELECT':
    if (state.selectKey === action.data) {
    	return Object.assign({}, {
      	itemSelected: false,
    		selectKey: null
      })
    } else {
    	return Object.assign({}, {
      	itemSelected: true,
    		selectKey: action.data
      })
    }
    default:
      return state
  }
}

export default reducer;