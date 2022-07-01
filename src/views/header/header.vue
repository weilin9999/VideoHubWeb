<template>
	<div class="header-box">
		<div class="header-inner-box">
			<div @click="goHome" title="前往主页面" class="logo-img">
				<div class="logo-name">
					<p class="name-bule">Vide<span class="iconfont icon-shipin"></span></p><p class="name-ye">Hub</p><p class="name-ye-ye">{{nameChar}}</p>
				</div>
			</div>

			<VH-Search v-if="!nosearch" @search="goSearch"></VH-Search>

			<VH-UserInfo :avatar="avatar">
				<div class="username">{{username}}</div>
				<a v-if="!nocollect && site != 'collect'" @click="goBtn('collect')" class="user-btn"><div class="user-btn-inner"><span class="col-right-6 iconfont icon-soucang"></span><p>我的收藏</p></div><span class="iconfont icon-youxiang"></span></a>
				<a v-if="!nocollect && site=='collect'" @click="goBtn('home')" class="user-btn"><div class="user-btn-inner"><span class="col-right-6 iconfont icon-shouye"></span><p>返回首页</p></div><span class="iconfont icon-youxiang"></span></a>
				<a @click="goBtn('info')" class="user-btn"><div class="user-btn-inner"><span class="col-right-6 iconfont icon-personal"></span><p>个人中心</p></div><span class="iconfont icon-youxiang"></span></a>
				<a @click="goBtn('upload')" class="user-btn"><div class="user-btn-inner"><span class="col-right-6 iconfont icon-yunduanshangchuan"></span><p>上传视频</p></div><span class="iconfont icon-youxiang"></span></a>
				<a @click="goBtn('loginout')" class="user-btn"><div class="user-btn-inner"><span class="col-right-6 iconfont icon-tuichu"></span><p>退出登录</p></div><span class="iconfont icon-youxiang"></span></a>
			</VH-UserInfo>
		</div>
    </div>
</template>

<script>
import VHSearch from '@/components/VH-Search/VH-Search.vue';
import VHUserInfo from '@/components/VH-UserInfo/VH-UserInfo.vue';
import cookies from 'vue-cookies';
import config from '@/api/config';
export default {
	name: 'vh-header',
	components:{
		VHSearch,
		VHUserInfo,
	},
	data() {
		return {
			avatar:'',
			username: '欢迎你',
			site:'',
		}
	},
	props:{
		nosearch:{
			type: Boolean,
			default:false
		},
		nocollect:{
			type: Boolean,
			default:false
		},
		nameChar:{
			type: String,
			default:'首页'
		}
	},
	created() {
		const origin = cookies.get('origin');
		this.username = origin.username;
		this.avatar = config.baseUrl.url +'/file/avatar/'+origin.avatar;
	},
	methods: {
		goSearch(e){
			this.$emit('search',e);
		},
		goBtn(e){
			let json= {'where':e}
			this.$emit('go',json);
			this.site=e
		},
		goHome(){
			window.open('./','_self')
		}
	}	
}
</script>

<style scoped>
@import '@/assets/css/header.css';
</style>