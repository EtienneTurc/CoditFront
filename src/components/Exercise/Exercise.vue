<template>
	<v-container>
		<h2 v-if="exercise.showTitle">{{exercise.title}}</h2>

		<v-row>
			<v-col md="6">
				<v-card class="pa-5">
					<v-img class="border-radius-inherit mb-2" :src="exercise.banner" height="170"></v-img>
					<div v-html="exercise.html"></div>
				</v-card>
			</v-col>
			<v-col md="6">
				<v-card>
					<v-btn
						v-if="exercise.success"
						small
						absolute
						dark
						fab
						top
						right
						color="success"
						class="disabled"
					>
						<v-icon>mdi-check</v-icon>
					</v-btn>
					<v-card-title>Tester ici votre code !</v-card-title>
					<v-file-input
						class="mr-5 ml-5"
						label="Votre code"
						dense
						ref="file"
						@change="submitFile"
						accept=".py"
					></v-file-input>
				</v-card>
				<v-card class="pa-5 mt-5" :class="color">
					<h3>Résultats:</h3>
					<loader v-if="loading" />
					<div v-if="!stdout && !stderr && !loading">Uploader un fichier !</div>
					<div v-html="stderr"></div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import Loader from "@/components/Utils/Loader"
import utils from "@/utils/utils.js"
import marked from "marked"

export default {
	data() {
		return {
			exercise: {},
			output: "Output",
			loading: false,
			stdout: "",
			stderr: "",
			color: "",
			file: null,
			success: false
		}
	},
	components: {
		loader: Loader
	},
	created() {
		this.getExercise()
	},
	methods: {
		async getExercise() {
			let res = await this.$http.get(
				process.env.VUE_APP_API_URL + "/exercise",
				{ params: { id: this.$route.params.id, withSuccess: true } }
			)
			this.exercise = res.data
			this.exercise.html = marked(this.exercise.markdown)
			this.exercise.banner = utils.getBanner(this.exercise.banner)
		},
		async submitFile(file) {
			if (!file) return
			this.loading = true
			this.stdout = ""
			this.stderr = ""
			this.color = ""
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
			this.stdout = utils.format(res.data.user_stdout || "", file.name)
			this.stderr = utils.format(res.data.user_stderr || "", file.name)
			this.success = res.data.success
			if (this.success) this.color = "success-background-color"
			else this.color = "failure-background-color"

			// Trick to allow the same file to be reupload
			let text = this.$refs.file.text[0]
			this.$refs.file.$children[2].$el.click()
			this.$refs.file.text[0] = text
		}
	}
}
</script>

<style>
.disabled:hover {
	cursor: default !important;
}

.border-radius-inherit {
	border-radius: inherit;
}

.v-card__title {
	padding-bottom: 0px !important;
}

.success-background-color {
	background-color: rgba(76, 175, 80, 0.2) !important;
}

.failure-background-color {
	background-color: rgba(246, 80, 81, 0.2) !important;
}

.success-color {
	color: #4caf50 !important;
}

.failure-color {
	color: rgba(246, 80, 81) !important;
}
</style>
