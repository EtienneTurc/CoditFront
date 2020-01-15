<template>
	<v-btn class="white--text shrink" color="#0984e3" @click="$router.go(-1)">
		<v-icon left>mdi-arrow-left</v-icon>Retour
	</v-btn>
</template>

<script>
export default {}
</script>

<style>
.shrink {
	transform: scale(0.9);
}
</style>
