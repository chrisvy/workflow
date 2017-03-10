//------dragging-------
const draggingAdd = (text) => ({
	type: 'DRAGGINGADD',
	data: text
})

const draggingMove = (text) => ({
	type: 'DRAGGINGMOVE',
	data: text
})

export { draggingAdd, draggingMove }
