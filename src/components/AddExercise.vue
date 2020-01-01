<template>
	<v-container>
		<h1>Add exercises</h1>
		<v-select hide-details v-model="exercise.language" :items="languages" label="Langage"></v-select>
		<input type="textarea" v-model="exercise.markdown" />
		<input @change="saveTestFile" type="file" />
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
		saveTestFile(e) {
			this.testFile = (e.target.files || e.dataTransfer.files)[0]
		},
		async postExercise() {
			if (!this.testFile) {
				console.log("No file uploaded")
				return
			}

			let data = new FormData()
			data.append("testFile", this.testFile)
			data.append("exercise", JSON.stringify(this.exercise))
			try {
				let res = await this.$http.post(
					process.env.VUE_APP_API_URL + "/exercise",
					data
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
