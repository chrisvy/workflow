const select = (selectKey) => ({
	type: 'SELECT',
	data: selectKey
})

const deselect = () => ({
	type: 'DESELECT'
})

export {select, deselect};



