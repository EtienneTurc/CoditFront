<template>
	<v-row class="navbar">
		<a @click="navigation('home')" class="app-margin">
			<span class="app-name">Submission platform</span>
		</a>
		<v-spacer></v-spacer>
		<span class="menu-item">
			<v-btn text class="white--text" @click="navigation('/addExercise')">Nouveau problème</v-btn>
		</span>
		<span class="menu-item">
			<v-btn text class="white--text" @click="navigation('/exercises')">Problèmes</v-btn>
		</span>
		<span class="menu-item">Nom Prénom</span>
		<span class="menu-item log-out">
			<v-btn color="primary" class="white--text" v-on="on" @click="logout">Log out</v-btn>
		</span>
	</v-row>
</template>

<script>
export default {
	data: () => ({
		loggedIn: false
	}),
	methods: {
		navigation(destination) {
			this.$router.push(destination)
		}
	}
}
</script>

<style lang="scss">
.navbar {
	background-color: blue;
}
.app-name {
	font-size: 3em;
	color: white;
}
.app-margin {
	margin-left: 5%;
}
.header {
	border-bottom-style: solid;
}
.v-center {
	margin-top: auto;
	margin-bottom: auto;
}
.log-out {
	margin-right: 5%;
}
.menu-item {
	color: white;
	margin-top: auto;
	margin-bottom: auto;
	margin-left: 1em;
}
</style>
