const cronMin = (data) => ({
	type: 'CRONMIN',
	data: data
})

const cronHour = (data) => ({
	type: 'CRONHOUR',
	data: data
})

const cronDay = (data) => ({
	type: 'CRONDAY',
	data: data
})

const cronMonth = (data) => ({
	type: 'CRONMONTH',
	data: data
})

const cronWeek = (data) => ({
	type: 'CRONWEEK',
	data: data
})

const cronYear = (data) => ({
	type: 'CRONYEAR',
	data: data
})

export { cronMin, cronHour, cronDay, cronMonth, cronWeek, cronYear };