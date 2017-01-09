// import { combineReducers } from 'redux';

const defaultState = {
	itemSelected: false,
  selectKey: null,
  search: ''
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
      return Object.assign({
        ...state,
        search: action.data
      })
    default:
      return state
  }
}

// const reducer = combineReducers({});

export default reducer;