//------menu-------
const menuTab = (type) => ({//树形栏顶部的Tab
	type: 'MENUTAB',
	data: type
})

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

const select = (path, id, text=null) => ({
	type: 'SELECT',
	data: path,
	id: id,
	text: text
})

const changeTab = (index, path) => ({//标签栏的Tab
	type: 'CHANGETAB',
	data: index,
	path: path
})

const closeTab = (index) => ({
	type: 'CLOSETAB',
	data: index
})

const rearrangeTab = (newSelectedTabs, newSelectedTabIds, newActiveIndex) => ({
	type: 'REARRANGETAB',
	data: {
		newSelectedTabs,
		newSelectedTabIds,
		newActiveIndex
	}
})

const contextMenuShow = (x, y, menuShow) => ({
	type: 'CONTEXTMENUSHOW',
	data: {
		x,
		y,
		menuShow
	}
})

export { menuTab, parsedMenu, changeMenu, open, select, changeTab, closeTab, rearrangeTab, contextMenuShow }
