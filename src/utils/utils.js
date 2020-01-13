
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

exports.truncate = (str, linesLimit, sizeLimit) => {
	let strLineCut = str.split("\n", linesLimit).join("\n")
	if (strLineCut.length == str.length && str.length < sizeLimit)
		return str
	return strLineCut.slice(0, sizeLimit) + "..."
}

exports.format = std => {
	std = std.split("\n\n").join("\n")
	if (!std.split("\n")[0]) {
		std = std.replace("\n", "")
	}
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
		.split("<FAILURE>")
		.join(
			"<i class='v-icon mdi mdi-close-circle theme--light failure-color'></i>"
		)

	return std
}
