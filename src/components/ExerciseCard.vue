<template>
	<v-card @click="navigation()" class="mx-auto">
		<v-list-item>
			<v-list-item-content>
				<v-list-item-title class="headline">{{exercise.title}}</v-list-item-title>
				<v-list-item-subtitle>{{exercise.language}}</v-list-item-subtitle>
				<v-list-item-subtitle>Diffuclty</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>

		<v-img :src="exercise.banner" height="170"></v-img>
	</v-card>
</template>

<script>
export default {
	props: ["exercise"],
	methods: {
		navigation() {
			this.$router.push({
				path: "/exercise/" + this.exercise._id
			})
		}
	},
	created() {
		if (!this.exercise.banner) {
			this.exercise.banner =
				process.env.VUE_APP_API_URL_MEDIA +
				`/default_banner_${parseInt(Math.random() * 11) + 1}.jpg`
		}
	}
}
</script>

<style>
</style>
