<template>
	<v-snackbar v-model="snackbar" :color="color" top :timeout="6000" class="ma-4">
		{{ message }}
		<v-btn dark text @click="snackbar = false">Close</v-btn>
	</v-snackbar>
</template>

<script>
export default {
	data: function() {
		return {
			snackbar: false,
			color: "",
			message: ""
		}
	},
	created: function() {
		let that = this
		this.$alert.$on("snackbar", opt => {
			that.message = opt.message
			that.color = opt.status
			that.snackbar = true
		})
	}
}
</script>
