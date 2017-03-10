//------cascader-------
const cascaderText = (path, text) => ({//TODELETE
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

export { cascaderText, cascaderMenu }
