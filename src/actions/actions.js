//------menu-------
const parsedMenu = (results) => ({
	type: 'PARSEDMENU',
	data: results
})

const changeMenu = (menus) => ({
	type: 'CHANGEMENU',
	data: menus
})

const open = (openKey) => ({
	type: 'OPEN',
	data: openKey
})

const select = (selectKey) => ({
	type: 'SELECT',
	data: selectKey
})

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

//------context-------
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

const addDir = (dirName) => ({
	type: 'ADDDIR',
	data: dirName
})


const addWork = (workName) => ({
	type: 'ADDWORK',
	data: workName
})

export {parsedMenu, changeMenu, open, select, search, searchResults, deleteSearchItem, contextItem, contextOperate, addDir, addWork};



