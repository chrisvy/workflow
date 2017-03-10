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

export default searchReducer
