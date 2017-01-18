const cronDefaultState = {
	currTab: 'minute',
	minute: {
		cronTab: '',
		cronRadio: '',
		cronAddon: ''
	},
	hour: {
		cronTab: '',
		cronRadio: '',
		cronAddon: ''
	},
	day: {
		cronTab: '',
		cronRadio: '',
		cronAddon: ''
	},
	month: {
		cronTab: '',
		cronRadio: '',
		cronAddon: ''
	},
	week: {
		cronTab: '',
		cronRadio: '',
		cronAddon: ''
	},
	year: {
		cronTab: '',
		cronRadio: '',
		cronAddon: ''
	}
}

const cronmakerReducer = (state=cronDefaultState, action) => {
  switch (action.type) {
    case 'CRONTAB':
      return Object.assign({}, {
        ...state,
        currTab: action.data
      })
    case 'CRONRADIO':
      return Object.assign({}, {
        ...state,
        [state.currTab]: {
        	...state[state.currTab],
        	cronRadio: action.data
        }
      })
    case 'CRONRADDON':
      return Object.assign({}, {
        ...state,
        [state.currTab]: {
        	...state[state.currTab],
        	cronAddon: action.data
        }
      })
		default:
      return state
  }
}

export { cronmakerReducer };


