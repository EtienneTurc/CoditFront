<template>
	<v-card @click="navigation" class="mx-auto">
		<div class="card-title">{{exercise.title}}</div>

		<v-img :src="exercise.banner" height="150"></v-img>
		<v-card-actions>
			<v-row align="center" justify="space-between" class="bottom-bar">
				<span class="language">{{exercise.language}}</span>
				<span v-if="exercise.difficulty">
					<span class="difficulty mr-1">{{exercise.difficulty}}</span>
					<v-icon style="color:#f1c40f">mdi-star</v-icon>
				</span>
			</v-row>
		</v-card-actions>
	</v-card>
</template>

<script>
import utils from "@/utils/utils"

export default {
	props: ["exercise"],
	data() {
		return {}
	},
	methods: {
		navigation() {
			this.$router.push({
				path: "/exercise/" + this.exercise._id
			})
		}
	},
	created() {
		this.exercise.banner = utils.getBanner(this.exercise.banner)
	}
}
</script>

<style scoped>
.flex-between {
	display: flex;
	justify-content: space-between;
}

.card-title {
	font-size: 1rem !important;
	font-weight: 500;
	padding: 10px 10px;
	line-height: normal;
	/* letter-spacing: normal !important;
    font-family: "Roboto", sans-serif !important */
}

.language {
	color: rgba(0, 0, 0, 0.6);
}

.difficulty {
	color: #f1c40f;
	vertical-align: middle;
	font-weight: bold;
}

.bottom-bar {
	margin: 2px;
}
</style>
