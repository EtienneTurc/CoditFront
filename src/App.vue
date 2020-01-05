<template>
	<v-app>
		<v-content>
			<navbar />
			<router-view />
		</v-content>
		<snackbar />
	</v-app>
</template>

<script>
import Navbar from "@/components/utils/Navbar"
import Snackbar from "@/components/utils/Snackbar"

export default {
	name: "App",
	components: {
		navbar: Navbar,
		snackbar: Snackbar
	},
	data: () => ({
		//
	})
}
</script>
