const select = (selectKey) => ({
	type: 'SELECT',
	data: selectKey
})

const open = (openKey) => ({
	type: 'OPEN',
	data: openKey
})

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

export {select, open, search, searchResults, deleteSearchItem};



