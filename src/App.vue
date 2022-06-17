<template>
	<div id="app">
		<router-view v-slot="{ Component }">
			<transition name="fade">
				<component :is="Component" />
			</transition>
		</router-view>
	</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			
		}
	},
	created() {
		
	},
	methods: {
		
	}	
}
</script>

<style scoped>
	
</style>

<style>
	body,html,#app{
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		top: 0;
		left: 0;
	}
</style>