<template>
	<v-container>
		<v-row align="center" justify="space-between">
			<h2>À faire</h2>
			<div class="subtitle">{{todo.length}}/{{done.length + todo.length}}</div>
		</v-row>
		<v-row align="center" justify="start" v-for="(exos, index) in todo" :key="'todo' + index">
			<v-col align-self="start" md="4" v-for="exo in exos" :key="exo._id">
				<exercice-card :exercise="exo" />
			</v-col>
		</v-row>
		<v-divider></v-divider>

		<v-row align="center" justify="space-between">
			<h2>Réussi</h2>
			<div class="subtitle">{{done.length}}/{{done.length + todo.length}}</div>
		</v-row>
		<v-row v-for="(exos, index) in done" :key="'done' + index">
			<v-col v-for="exo in exos" md="4" :key="exo._id">
				<exercice-card :exercise="exo"></exercice-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import ExerciseCard from "@/components/ExerciseCard.vue"
import utils from "@/utils/utils"

export default {
	data: () => {
		return {
			todo: [],
			done: []
		}
	},
	components: {
		"exercice-card": ExerciseCard
	},
	created() {
		this.getExercises()
	},
	methods: {
		async getExercises() {
			try {
				let res = await this.$http.get(
					process.env.VUE_APP_API_URL + "/exercises"
				)
				this.todo = []
				for (let index = 0; index < res.data.todo.length; index += 3) {
					this.todo.push(res.data.todo.slice(index, index + 3))
				}

				this.done = []
				for (let index = 0; index < res.data.done.length; index += 3) {
					this.done.push(res.data.done.slice(index, index + 3))
				}
			} catch (error) {
				utils.handle(this, error)
			}
		}
	}
}
</script>

<style>
.subtitle {
	color: grey;
}
</style>
