<template>
	<v-card class="card-expansion" style="z-index: 10;">
		<v-row>
			<v-col md="3" class="divider">
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title class="headline">{{group.title}}</v-list-item-title>
						<div class="description" v-html="html"></div>
					</v-list-item-content>
				</v-list-item>
			</v-col>
			<v-col md="9">
				<v-row align="center" justify="start" style="padding-left:0; margin-right:10px;">
					<v-col align-self="start" md="4" v-for="exercise in exercises" :key="exercise._id">
						<exercise-card :exercise="exercise" />
					</v-col>
				</v-row>
				<v-row justify="end" align="end" style="margin:10px 20px;">
					<v-btn class="primary" @click="navigation()">
						<v-icon style="margin-right:10px;">mdi-arrow-right</v-icon>Voir plus
					</v-btn>
				</v-row>
			</v-col>
		</v-row>
		<v-progress-linear absolute bottom :value="progress"></v-progress-linear>
	</v-card>
</template>

<script>
import marked from "marked"
import ExerciseCard from "@/components/Group/GroupExerciseCard.vue"
import utils from "@/utils/utils"

export default {
	props: ["group"],
	data() {
		return {}
	},
	components: {
		"exercise-card": ExerciseCard
	},
	computed: {
		exercises() {
			return utils.sortExercises(this.group.exercises).slice(0, 6)
		},
		progress() {
			return utils.progress(this.group.exercises)
		},
		html() {
			let str = this.group.description.split("\n").join("<br>")
			return str
		}
	},
	methods: {
		navigation() {
			this.$router.push({
				path: "/exercises/" + this.group._id
			})
		}
	}
}
</script>

<style>
.divider {
	border-right: 0.02rem solid#bbb2b2;
	padding-right: 0px;
}

.description {
	text-align: justify;
	font-size: 0.875rem;
	margin-top: 10px;
}

.card-expansion {
	position: relative;
	margin-left: 0px;
	margin-right: 0px;
	padding-right: 0px;
	padding-left: 0px;
	width: 100%;
}
</style>
