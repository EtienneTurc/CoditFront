<template>
	<v-toolbar class="navbar">
		<v-toolbar-title class="title white--text">Submission platform</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-toolbar-items>
			<v-btn
				text
				class="white--text"
				v-if="user.isAdmin"
				@click="navigation('/addExercise')"
			>Nouveau problème</v-btn>
			<v-btn text class="white--text" @click="navigation('/exercises')">Problèmes</v-btn>
			<v-btn text disabled style="color:white !important">
				<v-icon style="color:white !important">mdi-account</v-icon>
				{{user.firstName}}
				<br />
				{{user.lastName}}
			</v-btn>
			<v-btn @click="logout" text class="log-out white--text">
				<v-icon>mdi-logout</v-icon>Déconnexion
			</v-btn>
		</v-toolbar-items>
	</v-toolbar>
</template>

<script>
import utils from "@/utils/utils"

export default {
	data: () => ({
		loggedIn: false,
		user: {}
	}),
	methods: {
		navigation(destination) {
			this.$router.push(destination)
		},
		logout() {
			window.location.href =
				process.env.VUE_APP_API_URL +
				`/logout?next=${process.env.VUE_APP_URL}/login`
		},
		async getUserInfo() {
			try {
				let res = await this.$http.get(
					process.env.VUE_APP_API_URL + "/user"
				)
				this.user = res.data
			} catch (error) {
				utils.handle(this, error)
			}
		}
	},
	created() {
		this.getUserInfo()
	}
}
</script>

<style lang="scss">
.title {
	font-size: 1.5rem !important;
}
.navbar {
	background-color: #0984e3 !important;
}
.app-name {
	font-size: 2rem;
	color: white;
}
.header {
	border-bottom-style: solid;
}
.v-center {
	margin-top: auto;
	margin-bottom: auto;
}
.menu-item {
	color: white;
	margin-top: auto;
	margin-bottom: auto;
	// margin-left: 1em;
}
</style>
