<template>
	<v-container align-content-center class="s-bg is-fullheight">
		<v-layout align-center justify-center row fill-height>
			<div class="text-md-center">
				<v-img src="../assets/logo.png" class="logo my-3" contain height="200px"></v-img>

				<h1 class="font-weight-light display-3 white--text">
					Codit
					<sup style="font-size:0.4em; top: -1.2em;">0.1</sup>
				</h1>

				<h2 class="font-italic font-weight-regular white--text mb-5">Just code it !</h2>

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
				`/login?next=${process.env.VUE_APP_URL}/groups`
		}
	}
}
</script>

<style scoped>
.s-bg {
	background-color: #0984e3;
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

.logo {
	-webkit-animation: jackIntheBox 1s forwards, flash ease-out 4s infinite;
	-moz-animation: jackIntheBox 1s forwards, flash ease-out 4s infinite;
	animation: jackIntheBox 1s forwards, flash ease-out 4s infinite;
}

/* .logo {
	-webkit-animation: jackIntheBox 1s;
	-moz-animation: jackIntheBox 1s;
	animation: jackIntheBox 1s;
} */

@keyframes jackIntheBox {
	from {
		transform: scale(0.5) rotate(8deg);
		transform-origin: center bottom;
	}

	35% {
		transform: rotate(-4deg);
	}

	70% {
		transform: rotate(2deg);
	}
}

@-webkit-keyframes flash {
	from {
		opacity: 1;
	}
	20% {
		opacity: 1;
	}
	24% {
		opacity: 0.4;
	}
	26% {
		opacity: 0.8;
	}
	28% {
		opacity: 0.1;
	}
	30% {
		opacity: 1;
	}
	to {
		opacity: 1;
	}
}

@keyframes flash {
	from {
		opacity: 1;
	}
	20% {
		opacity: 1;
	}
	24% {
		opacity: 0.4;
	}
	26% {
		opacity: 0.8;
	}
	28% {
		opacity: 0;
	}
	30% {
		opacity: 1;
	}
	to {
		opacity: 1;
	}
}
</style>
