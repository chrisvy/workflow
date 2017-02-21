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

const select = (path, text=null) => ({
	type: 'SELECT',
	data: path,
	text: text
})

const dblSelect = (path) => ({
	type: 'DBLSELECT',
	data: path
})

const changeTab = (index, path) => ({
	type: 'CHANGETAB',
	data: index,
	path: path
})

const closeTab = (index) => ({
	type: 'CLOSETAB',
	data: index
})

export { parsedMenu, changeMenu, open, select, dblSelect, changeTab, closeTab }
