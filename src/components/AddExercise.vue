<template>
	<v-container>
		<h2>Ajouter un nouvel exercice</h2>
		<v-row>
			<v-col md="6">
				<v-form>
					<v-text-field autofocus v-model="exercise.title" label="Titre"></v-text-field>
					<v-select
						hide-details
						dense
						multiple
						item-text="title"
						item-value="_id"
						v-model="exercise.groups"
						:items="groups"
						label="Groupes"
					></v-select>
					<v-select hide-details v-model="exercise.language" :items="languages" label="Langage"></v-select>

					<v-textarea
						auto-grow
						class="mt-3"
						v-model="exercise.markdown"
						label="Sujet en markdown"
						required
					></v-textarea>
					<v-text-field
						type="number"
						:rules="[v => v>= 1 && v<=5 ]"
						v-model="exercise.difficulty"
						label="Difficulté (1 -> 5)"
					></v-text-field>

					<v-file-input @change="saveTestFile" accept=".py" label="Fichier de test"></v-file-input>
					<v-row>
						<v-col md="6">
							<v-text-field dense v-model="exercise.cpuTime" type="number" label="Temps cpu en s"></v-text-field>
						</v-col>
						<v-col md="6">
							<v-text-field dense v-model="exercise.memorySize" type="number" label="Espace mémoire en Mo"></v-text-field>
						</v-col>
					</v-row>
					<v-switch v-model="exercise.showTitle" label="Afficher le titre"></v-switch>
					<v-file-input @change="saveBanner" accept="image/*" label="Banner"></v-file-input>
					<v-btn @click="postExercise" class="primary">Soumettre</v-btn>
				</v-form>
			</v-col>
			<v-col md="6">
				<div v-html="html"></div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import marked from "marked"
import utils from "@/utils/utils"

export default {
	data: () => {
		return {
			exercise: { uploaderMail: "etienne.turc@ensta-paris.fr" },
			languages: ["Python3"],
			groups: []
		}
	},
	computed: {
		html: function() {
			return marked(this.exercise.markdown || "")
		}
	},
	created() {
		this.getGroups()
	},
	methods: {
		saveTestFile(file) {
			this.testFile = file
		},
		saveBanner(file) {
			this.banner = file
		},
		async getGroups() {
			let res = await this.$http.get(
				process.env.VUE_APP_API_URL + "/groups"
			)
			this.groups = res.data
		},
		async postExercise() {
			if (!this.testFile) {
				this.$alert.$emit("snackbar", {
					message: "Erreur : No file uploaded",
					status: "error"
				})
				return
			}

			let data = new FormData()
			if (this.banner) {
				data.append("banner", this.banner)
			}
			data.append("testFile", this.testFile)
			data.append("exercise", JSON.stringify(this.exercise))
			try {
				let res = await this.$http.post(
					process.env.VUE_APP_API_URL + "/exercise",
					data
				)
				this.$alert.$emit("snackbar", {
					message: "Exercice ajouté",
					status: "success"
				})
				this.$router.push("/exercise/" + res.data._id)
			} catch (error) {
				utils.handle(this, error)
			}
		}
	}
}
</script>

<style>
</style>
