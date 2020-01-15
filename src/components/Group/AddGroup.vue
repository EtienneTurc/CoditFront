<template>
	<v-container>
		<h2>Ajouter un nouveau groupe</h2>
		<v-form>
			<v-text-field autofocus v-model="group.title" label="Titre"></v-text-field>
			<v-textarea auto-grow class="mt-3" v-model="group.description" label="Description" required></v-textarea>
			<time-picker
				:init_date="group.startTime"
				@time="setTime('startTime', $event)"
				label_date="Date de début"
				label_hours="Heure de début"
			></time-picker>
			<time-picker
				:init_date="group.endTime"
				@time="setTime('endTime', $event)"
				label_date="Date de fin"
				label_hours="Heure de fin"
				:min_date="group.startTime"
			></time-picker>
			<v-btn @click="postGroup" class="primary">Soumettre</v-btn>
		</v-form>
	</v-container>
</template>

<script>
import marked from "marked"
import utils from "@/utils/utils"
import TimePicker from "@/components/Utils/TimePicker"

export default {
	data: () => {
		return {
			group: {}
		}
	},
	components: {
		"time-picker": TimePicker
	},
	methods: {
		setTime(key, time) {
			this.$set(this.group, key, time)
		},
		async postGroup() {
			try {
				this.group.startTime = this.group.startTime
					? this.group.startTime
					: new Date()
				let res = await this.$http.post(
					process.env.VUE_APP_API_URL + "/group",
					{ group: this.group }
				)
				this.$alert.$emit("snackbar", {
					message: "Groupe ajouté",
					status: "success"
				})
				this.$router.push("/addExercise")
			} catch (error) {
				utils.handle(this, error)
			}
		}
	}
}
</script>

<style>
</style>
