<template>
	<v-card @click="$emit('show')" class="mx-auto">
		<v-list-item>
			<v-list-item-content>
				<v-list-item-title class="headline">{{group.title}}</v-list-item-title>
				<v-card-text>
					<div v-html="description"></div>
				</v-card-text>
			</v-list-item-content>
		</v-list-item>
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
