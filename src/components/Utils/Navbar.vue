<template>
	<v-toolbar class="navbar">
		<v-row>
			<v-col md="2" class="v-center">
				<v-toolbar-title class="v-center">
					<span class="app-name">Codit</span>
				</v-toolbar-title>
			</v-col>
			<v-col md="10" class="v-center">
				<span class="items-right v-center">
					<v-btn
						text
						class="separate white--text"
						v-if="user.isAdmin"
						@click="navigation('/addGroup')"
					>Nouveau Groupe</v-btn>
					<v-btn
						text
						class="separate white--text"
						v-if="user.isAdmin"
						@click="navigation('/addExercise')"
					>Nouveau problème</v-btn>
					<v-btn text class="separate white--text" @click="navigation('/groups')">Groupes</v-btn>
					<v-btn text class="separate white--text" @click="navigation('/exercises')">Problèmes</v-btn>
					<!-- <v-btn text disabled class="separate username" style="color:white !important">
						<v-icon style="color:white !important">mdi-account</v-icon>
						{{user.firstName}}
						<br />
						{{user.lastName}}
					</v-btn>-->
					<v-btn @click="logout" text class="separate log-out white--text">
						<v-icon>mdi-logout</v-icon>Déconnexion
					</v-btn>
				</span>
			</v-col>
		</v-row>
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
// .items {
// 	display: flex;
// 	justify-content: space-between;
// 	align-content: space-between;
// 	align-items: space-between;
// }

.items-left {
	display: block;
}

.items-right {
	display: flex;
	justify-content: flex-end;
	width: 100%;
	flex-wrap: wrap;
}

.logo {
	margin-top: 10%;
	margin-left: 5%;
}

.app-name {
	font-size: 2rem !important;
	color: white;
	margin-left: 10px;
}

.navbar {
	background-color: #0984e3 !important;
}

.username {
	font-weight: normal !important;
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

// .separate {
// 	border-left: 0.01rem solid rgb(255, 255, 255, 0.95);
// }
</style>
