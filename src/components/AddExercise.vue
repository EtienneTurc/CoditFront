<template>
	<v-container>
		<h1>Add exercises</h1>
		<v-select hide-details v-model="exercise.language" :items="languages" label="Langage"></v-select>
		<input type="textarea" v-model="exercise.markdown" />
		<button @click="postExercise">Submit</button>
	</v-container>
</template>

<script>
export default {
	data: () => {
		return {
			exercise: { uploaderMail: "etienne.turc@ensta-paris.fr" },
			languages: ["Python3"]
		}
	},
	methods: {
		async postExercise() {
			try {
				let res = await this.$http.post(
					process.env.VUE_APP_API_URL + "/exercise",
					this.exercise
				)
				console.log(res)
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>

<style>
</style>
