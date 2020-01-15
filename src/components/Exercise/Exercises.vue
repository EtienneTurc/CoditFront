<template>
	<v-container>
		<v-row align="center" justify="space-between" class="mb-2 ml-1">
			<h2>{{title}}</h2>
			<go-back v-if="$route.params.id" />
		</v-row>
		<v-row align="center" justify="space-between" class="ml-1 mr-1">
			<div class="title">À faire</div>
			<div class="subtitle">{{todoLength}}/{{doneLength + todoLength}}</div>
		</v-row>
		<v-row align="center" justify="start" v-for="(exos, index) in todo" :key="'todo' + index">
			<v-col align-self="start" md="4" v-for="exo in exos" :key="exo._id">
				<exercice-card :exercise="exo" />
			</v-col>
		</v-row>
		<v-divider></v-divider>

		<v-row align="center" justify="space-between" class="ml-1 mr-1">
			<div class="title">Réussi</div>
			<div class="subtitle">{{doneLength}}/{{doneLength + todoLength}}</div>
		</v-row>
		<v-row v-for="(exos, index) in done" :key="'done' + index">
			<v-col v-for="exo in exos" md="4" :key="exo._id">
				<exercice-card :exercise="exo"></exercice-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import ExerciseCard from "@/components/Exercise/ExerciseCard.vue"
import GoBack from "@/components/Utils/GoBack.vue"
import utils from "@/utils/utils"

export default {
	data: () => {
		return {
			todoLength: 0,
			doneLength: 0,
			todo: [],
			done: [],
			group: {}
		}
	},
	computed: {
		title() {
			return this.group && this.group.title
				? this.group.title
				: "Tous les exercices"
		}
	},
	components: {
		"exercice-card": ExerciseCard,
		"go-back": GoBack
	},
	created() {
		this.getExercises()
	},
	methods: {
		async getExercises() {
			try {
				let res = await this.$http.get(
					process.env.VUE_APP_API_URL + "/exercises",
					{ params: { group_id: this.$route.params.id } }
				)
				this.group = res.data.group
				this.todo = []
				this.todoLength = res.data.todo.length
				for (let index = 0; index < res.data.todo.length; index += 3) {
					this.todo.push(res.data.todo.slice(index, index + 3))
				}

				this.doneLength = res.data.done.length
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
