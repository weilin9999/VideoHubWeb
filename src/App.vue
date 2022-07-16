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
import '@/components/banner.js';
import cookies from 'vue-cookies'
export default {
	name: 'App',
	data() {
		return {
			
		}
	},
	watch: {
		
	},
	created() {
		const origin = cookies.get('origin')
		if(origin == null){
			this.$router.push({ path: '/login' })
		}
	},
	methods: {

	}	
}
</script>

<style scoped>
	
</style>

<style>
@import '@/assets/iconfont/iconfont.css';
	body,html,#app{
		width: 100%;
		height: auto;
		margin: 0;
		padding: 0;
		top: 0;
		left: 0;
	}
	::-webkit-scrollbar {
		width:12px;
		height: 12px;
	}
	
	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset006px rgba(0,0,0,0.5);
		border-radius:3px;
	}
	
	::-webkit-scrollbar-thumb {
		background:#999;
		border-radius: 7px;
		outline: 2px solid #fff;
		outline-offset: -2px;
		border: 2px solid #fff;
		-webkit-box-shadow: inset006px rgba(0,0,0,0.5);
	}
	::-webkit-scrollbar-thumb:hover{
		background:#b8b8b8;
	}
</style>