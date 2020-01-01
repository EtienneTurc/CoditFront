<template>
	<v-app>
		<v-content>
			<navbar />
			<router-view />
		</v-content>
	</v-app>
</template>

<script>
import Navbar from "@/components/Navbar"

export default {
	name: "App",
	components: {
		navbar: Navbar
	},
	data: () => ({
		//
	})
}
</script>
