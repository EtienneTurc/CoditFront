<template>
	<v-card @click="navigation" class="mx-auto">
		<v-list-item>
			<v-list-item-content>
				<v-list-item-title class="headline">
					<div class="flex-between">
						{{exercise.title}}
						<div class="stars">
							<v-icon v-for="(exo,i) in exercise.difficulty" :key="i" style="color:#f1c40f">mdi-star</v-icon>
						</div>
					</div>
				</v-list-item-title>
				<v-list-item-subtitle>{{exercise.language}}</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>

		<v-img :src="exercise.banner" height="170"></v-img>
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

.difficulty {
	color: #f1c40f;
	vertical-align: middle;
	font-weight: bold;
}

.stars {
	font-size: 0.8rem;
}
</style>
