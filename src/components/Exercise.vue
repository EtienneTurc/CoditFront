<template>
	<v-container>
		<h1>{{exercise.title}}</h1>
		<v-row>
			<v-col md="6">
				<v-card class="mx-auto">
					<v-card-text v-html="exercise.subject"></v-card-text>
				</v-card>
			</v-col>
			<v-col md="6">
				<v-card class="mx-auto">
					<v-list dense>
						Ressources à disposition
						<v-list-item-group>
							<v-list-item>
								<v-list-item-icon></v-list-item-icon>
								<v-list-item-content>{{exercise.cpuTime}}s d'execution</v-list-item-content>
							</v-list-item>

							<v-list-item>
								<v-list-item-icon></v-list-item-icon>
								<v-list-item-content>{{exercise.memorySize}} Mo</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
					<input @change="submitFile" type="file" />
				</v-card>
				<v-card v-if="output" class="mx-auto mt-6">
					<v-card-text v-html="output"></v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			exercise: {},
			output: "Output"
		}
	},
	methods: {
		async getExercise() {
			let res = await this.$http.get(
				process.env.VUE_APP_API_URL +
					"/exercise?id=" +
					this.$route.params.id
			)
			this.exercise = res.data
			console.log(this.exercise)
		},
		async submitFile(e) {
			let file = (e.target.files || e.dataTransfer.files)[0]
			let data = new FormData()

			data.append("submission", file)

			let res = await this.$http.put(
				process.env.VUE_APP_API_URL + "/submission",
				data,
				{
					params: { id: this.exercise._id }
				}
			)

			console.log(res)
		}
	},
	created() {
		this.getExercise()
	}
}
</script>

<style>
</style>
