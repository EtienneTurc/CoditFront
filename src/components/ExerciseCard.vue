<template>
	<v-card @click="navigation" class="mx-auto">
		<v-list-item>
			<v-list-item-content>
				<v-list-item-title class="headline">
					<div class="flex-between">
						{{exercise.title}}
						<div>
							<v-icon v-for="(exo,i) in exercise.difficulty" :key="i" style="color:yellow">mdi-star</v-icon>
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

.zoom-in,
.zoom-out {
	animation-duration: 0.5s;
	animation-fill-mode: both;
	animation-name: zoom;
}

.zoom-out {
	animation-direction: reverse;
}

@keyframes zoom {
	from {
		opacity: 1;
	}

	100% {
		transform: scale3d(2, 2, 2);
		opacity: 1;
	}
}

.fade-out {
	animation-duration: 0.5s;
	animation-fill-mode: both;
	animation-name: fade-out;
}

@keyframes fade-out {
	from {
		opacity: 1;
	}

	100% {
		opacity: 0;
	}
}
</style>
