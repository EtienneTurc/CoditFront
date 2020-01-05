<template>
	<v-container>
		<h1 v-if="exercise.showTitle">{{exercise.title}}</h1>
		<v-row>
			<v-col md="6">
				<v-card class="pa-5">
					<v-img class="baorder-radius-inherit mb-2" :src="exercise.banner" height="170"></v-img>
					<div v-html="exercise.html"></div>
				</v-card>
			</v-col>
			<v-col md="6">
				<v-card>
					<v-card-title>Tester ici votre code !</v-card-title>
					<v-file-input class="mr-5 ml-5" dense @change="submitFile" accept=".py"></v-file-input>
				</v-card>
				<v-card class="pa-5 mt-5">
					<h3>Résultats:</h3>
					<loader v-if="loading" />
					<div v-if="!stdout && !stderr">Uploader un fichier !</div>
					<div v-html="stdout"></div>
					<div v-html="stderr"></div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import Loader from "@/components/utils/Loader"
import utils from "@/utils/utils.js"
import marked from "marked"

export default {
	data() {
		return {
			exercise: {},
			output: "Output",
			loading: false,
			stdout: "",
			stderr: ""
		}
	},
	components: {
		loader: Loader
	},
	methods: {
		async getExercise() {
			let res = await this.$http.get(
				process.env.VUE_APP_API_URL +
					"/exercise?id=" +
					this.$route.params.id
			)
			this.exercise = res.data
			this.exercise.html = marked(this.exercise.markdown)
			this.exercise.banner = utils.defaultBanner(this.exercise.banner)
		},
		async submitFile(file) {
			// let file = (e.target.files || e.dataTransfer.files)[0]
			this.loading = true
			let data = new FormData()

			data.append("submission", file)

			let res = await this.$http.put(
				process.env.VUE_APP_API_URL + "/submission",
				data,
				{
					params: { id: this.exercise._id }
				}
			)
			this.loading = false
			this.stdout = res.data.user_stdout.split("\n").join("<br>")
			this.stderr = res.data.user_stderr.split("\n").join("<br>")
			this.stdout = marked(this.stdout || "")
			this.stderr = marked(this.stderr || "")
			console.log(this.stdout)
			console.log(this.stderr)
		}
	},
	created() {
		this.getExercise()
	}
}
</script>

<style>
.baorder-radius-inherit {
	border-radius: inherit;
}

.v-card__title {
	padding-bottom: 0px !important;
}
</style>
