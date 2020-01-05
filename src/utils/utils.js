
exports.defaultBanner = banner => {
	if (!banner) {
		banner =
			process.env.VUE_APP_API_URL_MEDIA +
			`/default_banner_${parseInt(Math.random() * 11) + 1}.jpg`
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
