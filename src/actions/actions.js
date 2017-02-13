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
const contextItem = (path, text, contextType) => ({
	type: 'CONTEXTITEM',
	data: {
		path,
		text,
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

const cpWork = (workName) => ({
	type: 'CPWORK',
	data: workName
})

const mvWork = (workName) => ({
	type: 'MVWORK',
	data: workName
})

const rmWork = (workName) => ({
	type: 'RMWORK',
	data: workName
})

const backWork = (workName) => ({
	type: 'BACKWORK',
	data: workName
})

//------cascader-------
const cascaderText = (path, text) => ({
	type: 'CASCADERTEXT',
	data: {
		path,
		text
	}
})

const cascaderMenu = (path) => ({
	type: 'CASCADERMENU',
	data: path
})

//------dragging-------
const draggingAdd = (text) => ({
	type: 'DRAGGINGADD',
	data: text
})

const draggingMove = (text) => ({
	type: 'DRAGGINGMOVE',
	data: text
})

export {
	parsedMenu, changeMenu, open, select, 
	search, searchResults, deleteSearchItem, 
	contextItem, contextOperate, addDir, addWork, cpWork, mvWork, rmWork, backWork,
	cascaderText, cascaderMenu,
	draggingAdd, draggingMove
};



