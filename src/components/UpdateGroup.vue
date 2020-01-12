<template>
	<v-container>
		<h2>Modifier un groupe</h2>
		<v-form>
			<v-text-field autofocus v-model="group.title" label="Titre"></v-text-field>
			<v-textarea
				auto-grow
				class="mt-3"
				v-model="group.description"
				label="Description (en markdown)"
				required
			></v-textarea>
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
			<v-btn @click="updateGroup" class="primary">Soumettre</v-btn>
		</v-form>
	</v-container>
</template>

<script>
import marked from "marked"
import utils from "@/utils/utils"
import TimePicker from "@/components/utils/TimePicker"

export default {
	data: () => {
		return {
			group: {}
		}
	},
	components: {
		"time-picker": TimePicker
	},
	created() {
		this.getGroup()
	},
	methods: {
		setTime(key, time) {
			this.$set(this.group, key, time)
		},
		async getGroup() {
			let res = await this.$http.get(
				process.env.VUE_APP_API_URL +
					"/group?id=" +
					this.$route.params.id
			)
			this.group = res.data[0]
		},
		async updateGroup() {
			try {
				this.group.startTime = this.group.startTime
					? this.group.startTime
					: new Date()
				let res = await this.$http.put(
					process.env.VUE_APP_API_URL + "/group",
					{ group: this.group }
				)
				this.$alert.$emit("snackbar", {
					message: "Groupe modifié",
					status: "success"
				})
				this.$router.push("/exercises")
			} catch (error) {
				utils.handle(this, error)
			}
		}
	}
}
</script>

<style>
</style>
