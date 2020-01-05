<template>
	<v-container>
		<button @click="navigation('exercises')">Exercises</button>
		<button @click="navigation('addExercises')">Add Exercises</button>
		<button @click="login">Login</button>
	</v-container>
</template>

<script>
export default {
	data() {},
	methods: {
		navigation(destination) {
			this.$router.push(destination)
		},
		login() {
			window.location.href =
				process.env.VUE_APP_API_URL +
				`/login?next=${process.env.VUE_APP_URL}/exercises`
		}
	}
}
</script>

<style>
</style>
