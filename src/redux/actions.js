const parsedMenu = (results) => ({
	type: 'PARSEDMENU',
	data: results
})

const open = (openKey) => ({
	type: 'OPEN',
	data: openKey
})

const select = (selectKey) => ({
	type: 'SELECT',
	data: selectKey
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

const contextItem = (path, contextType) => ({
	type: 'CONTEXTITEM',
	data: {
		path,
		contextType
	}
})

const contextOperate = (operate) => ({
	type: 'CONTEXTOPERATE',
	data: operate
})


export {parsedMenu, open, select, search, searchResults, deleteSearchItem, contextItem, contextOperate};



