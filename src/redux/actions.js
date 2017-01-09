const select = (selectKey) => ({
	type: 'SELECT',
	data: selectKey
})

const search = (value) => ({
	type: 'SEARCH',
	data: value
})

export {select, search};



