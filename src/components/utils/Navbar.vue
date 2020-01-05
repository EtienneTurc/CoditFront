<template>
	<v-row class="navbar">
		<v-col cols="5">
			<v-row justify="space-around">
				<a @click="navigation('home')">
					<span class="app-name">Submission platform</span>
				</a>
			</v-row>
		</v-col>
		<v-col cols="6" class="menu-item">
			<v-row justify="space-between">
				<v-btn
					text
					class="white--text"
					v-if="user.isAdmin"
					@click="navigation('/addExercise')"
				>Nouveau problème</v-btn>
				<v-btn text class="white--text" @click="navigation('/exercises')">Problèmes</v-btn>
				<span class="menu-item">{{user.firstName}} {{user.lastName}}</span>
				<v-btn color="primary" @click="logout" class="log-out white--text">Log out</v-btn>
			</v-row>
		</v-col>
		<v-spacer></v-spacer>
	</v-row>
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
				`/logout?next=${process.env.VUE_APP_URL}`
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
.navbar {
	background-color: blue;
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
