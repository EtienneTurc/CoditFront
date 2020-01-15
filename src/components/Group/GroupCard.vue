<template>
	<v-card @click="$emit('show')" class="mx-auto" height="100%">
		<v-list-item>
			<v-list-item-content>
				<v-list-item-title class="headline">{{group.title}}</v-list-item-title>
				<v-card-text>
					<div class="justify" v-html="description"></div>
				</v-card-text>
			</v-list-item-content>
		</v-list-item>
		<v-progress-linear absolute bottom :value="progress"></v-progress-linear>
	</v-card>
</template>

<script>
import marked from "marked"
import utils from "@/utils/utils"

export default {
	props: ["group"],
	data() {
		return {
			show: false
		}
	},
	computed: {
		progress() {
			return utils.progress(this.group.exercises)
		},
		description() {
			let str = utils.truncate(this.group.description, 5, 180)
			str = str.split("\n").join("<br>")
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

<style scoped>
.flex-between {
	display: flex;
	justify-content: space-between;
}

.justify {
	/* text-align: justify; */
}
</style>
