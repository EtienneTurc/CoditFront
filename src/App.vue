<template>
	<v-app>
		<v-content>
			<navbar v-if="this.$route.name != 'login'"></navbar>
			<router-view />
		</v-content>
		<snackbar />
	</v-app>
</template>

<script>
import Navbar from "@/components/Utils/Navbar"
import Snackbar from "@/components/Utils/Snackbar"

export default {
	name: "App",
	components: {
		navbar: Navbar,
		snackbar: Snackbar
	},
	data() {
		return {}
	},
	created() {}
}
</script>

<style scoped>
.zoom-enter-active,
.zoom-leave-active {
	animation-duration: 0.5s;
	animation-fill-mode: both;
	animation-name: zoom;
}

.zoom-leave-active {
	animation-direction: reverse;
}

@keyframes zoom {
	from {
		opacity: 0;
		transform: scale3d(1.5, 1.5, 1.5);
	}

	100% {
		opacity: 1;
	}
}
</style>
