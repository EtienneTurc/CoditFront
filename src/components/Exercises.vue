<template>
	<v-container>
		Exercises
		<div v-for="(exercise, index) in exercises" :key="index">
			<div v-html="exercise.subject"></div>
		</div>
	</v-container>
</template>

<script>
export default {
	data: () => {
		return {
			exercises: [1, 2, 2]
		}
	},
	methods: {
		async getExercises() {
			try {
				let res = await this.$http.get(
					process.env.VUE_APP_API_URL + "/exercises"
				)
				this.exercises = res.data
				console.log(res)
			} catch (error) {
				console.log(error)
			}
		}
	},
	created() {
		this.getExercises()
	}
}
</script>

<style>
</style>
