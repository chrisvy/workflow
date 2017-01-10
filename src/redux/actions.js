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

const searchKey = (path) => ({
	type: 'SEARCHKEY',
	data: path
})

export {select, open, search, searchKey};



