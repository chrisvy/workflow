//------context-------
const contextItem = (path, id, text, contextType) => ({
	type: 'CONTEXTITEM',
	data: {
		path,
		id,
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

export { contextItem, contextOperate, addDir, addWork, cpWork, mvWork, rmWork, backWork }
