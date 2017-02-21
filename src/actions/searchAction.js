//------search-------
const search = (searchVal) => ({
	type: 'SEARCH',
	data: searchVal
})

const searchResults = (results) => ({
	type: 'SEARCHRESULTS',
	data: results
})

const deleteSearchItem = (index) => ({
	type: 'DELETESEARCHITEM',
	data: index
})

export { search, searchResults, deleteSearchItem }
