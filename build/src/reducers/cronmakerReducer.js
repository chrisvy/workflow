const cronDefaultState = {
	min: '',
	hour: '',
	day: '',
	month: '',
	week: '',
	year: '',
}

const cronmakerReducer = (state=cronDefaultState, action) => {
  switch (action.type) {
    case 'CRONMIN':
      return Object.assign({}, {
        ...state,
        min: action.data
      })
    case 'CRONHOUR':
      return Object.assign({}, {
        ...state,
        hour: action.data
      })
    case 'CRONDAY':
      return Object.assign({}, {
        ...state,
        day: action.data
      })
    case 'CRONMONTH':
      return Object.assign({}, {
        ...state,
        day: action.data
      })
    case 'CRONWEEK':
      return Object.assign({}, {
        ...state,
        day: action.data
      })
    case 'CRONYEAR':
      return Object.assign({}, {
        ...state,
        day: action.data
      })
		default:
      return state
  }
}

export { cronmakerReducer };


