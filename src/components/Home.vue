<template>
	<v-container>
		<button @click="navigation('exercises')">Exercises</button>
		<button @click="navigation('addExercises')">Add Exercises</button>
	</v-container>
</template>

<script>
export default {
	data() {},
	methods: {
		navigation(destination) {
			this.$router.push(destination)
		}
	}
}
</script>

<style>
</style>
