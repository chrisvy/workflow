const cronTab = (data) => ({
	type: 'CRONTAB',
	data: data
})

const cronRadio = (data) => ({
	type: 'CRONRADIO',
	data: data
})

const cronAddon = (data) => ({
	type: 'CRONRADDON',
	data: data
})

export { cronTab, cronRadio, cronAddon };