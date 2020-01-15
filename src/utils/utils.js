
exports.getBanner = banner => {
	if (!banner) {
		banner =
			process.env.VUE_APP_API_URL_MEDIA +
			`/default_banner_${parseInt(Math.random() * 11) + 1}.jpg`
	} else {
		banner = process.env.VUE_APP_API_URL_MEDIA + banner
	}
	return banner
}

exports.handle = (ctx, err) => {
	console.error(err)

	if (err.response && err.response && err.response.status == 401)
		return this.logout(ctx)

	let data = (err.response || {}).data
	let message = (data || {}).message
	ctx.$alert.$emit("snackbar", {
		message: "Erreur : " + (message || data),
		status: "error",
	})
}

exports.sortExercises = exercises => {
	const comparator = function (a, b) {
		if (a.success == b.success) {
			if (a.difficulty < b.difficulty) {
				return -1
			} else {
				return 1
			}
		}
		return a.success - b.success
	}
	return exercises.sort(comparator)
}

exports.progress = exercises => {
	let reducer = (accumulator, currentValue) => currentValue.success ? (1 + accumulator) : accumulator;
	let a = 100 * exercises.reduce(reducer, 0) / exercises.length
	return a
}

exports.truncate = (str, linesLimit, sizeLimit) => {
	let strLineCut = str.split("\n", linesLimit).join("\n")
	if (strLineCut.length == str.length && str.length < sizeLimit)
		return str
	return strLineCut.slice(0, sizeLimit) + "..."
}

exports.format = (std, filename = "") => {
	std = std.split("\n\n").join("\n")
	if (!std.split("\n")[0]) {
		std = std.replace("\n", "")
	}
	std = std.split("  ").join("&nbsp;&nbsp;")
	std = std.split("\n")
	for (let index = 0; index < std.length; index++) {
		if (std[index].startsWith("<SUCCESS>")) {
			if (std[index].trim().endsWith(":"))
				std[index] = std[index].trim().slice(0, -1)
			std[index] = `<span class="success-color">${
				std[index]
				}</span>`
		} else if (std[index].startsWith("<FAILURE>")) {
			std[index] = `<span class="failure-color">${
				std[index]
				}</span>`
		}
	}
	std = std.join("<br>")
	std = std
		.split("<SUCCESS>")
		.join(
			"<i class='v-icon mdi mdi-check theme--light success-color'></i>"
		)
	std = std
		.split(/<ERROR>|<FAILURE>/)
		.join(
			"<i class='v-icon mdi mdi-close-circle theme--light failure-color'></i>"
		)
	std = std.split("File \"<string>\"").join(`File ${filename}`)

	if (std.includes("<br>MemoryError<br>")) {
		std = "MemoryError"
	}

	return std
}
