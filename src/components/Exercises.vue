<template>
	<v-container>
		<h1>À faire</h1>
		<v-row
			align="center"
			justify="start"
			v-for="(exos, index) in exercices_todo"
			:key="'todo' + index"
		>
			<v-col align-self="start" md="4" v-for="exo in exos" :key="exo._id">
				<exercice-card :exercise="exo" />
			</v-col>
		</v-row>
		<v-divider></v-divider>
		<h1>Réussi</h1>
		<v-row v-for="(exos, index) in exercices_todo" :key="'done' + index">
			<v-col v-for="exo in exos" md="4" :key="exo._id">
				<exercice-card :exercise="exo" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import ExerciseCard from "@/components/ExerciseCard.vue"

export default {
	data: () => {
		return {
			exercices_todo: []
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
				this.exercices_todo = []
				for (let index = 0; index < res.data.length; index += 3) {
					this.exercices_todo.push(res.data.slice(index, index + 3))
				}
				this.exercices_todo[1].push(res.data[0])
				console.log(this.exercices_todo)
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
