<template>
	<v-container align-content-center class="s-bg is-fullheight">
		<v-layout align-center justify-center row fill-height>
			<div class="text-md-center">
				<!-- <v-img class="my-3" contain height="200px"></v-img> -->

				<h1 class="font-weight-light display-3 white--text">
					Submission platform
					<sup style="font-size:0.4em; top: -1.2em;">1.0</sup>
				</h1>

				<h2 class="font-italic font-weight-regular white--text mb-5">Trouvez ici</h2>

				<v-btn color="blue" depressed dark large @click="login">Connexion</v-btn>
			</div>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	data: () => ({}),
	methods: {
		login() {
			window.location.href =
				process.env.VUE_APP_API_URL +
				`/login?next=${process.env.VUE_APP_URL}/exercises`
		}
	}
}
</script>

<style scoped>
.s-bg {
	background-color: #2c3e50;
}

.is-fullheight {
	height: 100vh;
	width: 100vw;
}

.container {
	max-width: 100vw;
}

html {
	height: 100%;
}
</style>
