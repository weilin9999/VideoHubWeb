<template>
	<div class="main-login-box">

		<div v-if="!isReg" class="login-box">
			<h1>登录</h1>
			<div class="login-box-inner">
				<form>
					<div class="user-box">
						<input type="text" v-model="userFrom.account" required @change="errFrom.account=false">
						<label>账号</label>
						<span v-if="errFrom.account">{{errFrom.accountmsg}}</span>
					</div>
					<div class="user-box">
						<input type="password" v-model="userFrom.password" autocomplete="on" required @change="errFrom.password=false">
						<label>密码</label>
						<span v-if="errFrom.password">{{errFrom.passwordmsg}}</span>
					</div>
				</form>
			</div>
			<div class="login-bottom-box">
				<button class="login-btn" @click="login">登录</button>
				<button class="login-btn" @click="isReg=true">注册</button>
			</div>
		</div>

		<div v-if="isReg" class="login-box">
			<h1>注册</h1>
			<div class="login-box-inner">
				<form>
					<div class="user-box">
						<input type="text" name="" required autocomplete="on">
						<label>账号</label>
						<span>请输入账号</span>
					</div>
					<div class="user-box">
						<input type="text" name="" required autocomplete="on">
						<label>用户名</label>
						<span>请输入用户名</span>
					</div>
					<div class="user-box">
						<input type="password" name="" required autocomplete="on">
						<label>密码</label>
						<span>请输入密码</span>
					</div>
				</form>
			</div>
			<div class="login-bottom-box">
				<button class="login-btn" @click="isReg=false;login">注册</button>
			</div>
		</div>
		<button @click="addMsg">add</button>
		<AlertMsg :msg="msg"></AlertMsg>
		
	</div>
</template>

<script>
import AlertMsg from '@/components/AlertMsg/AlertMsg.vue'
import { postRequest } from '@/api';
export default {
	name: 'login',
	components:{
		AlertMsg
	},
	data() {
		return {
			isReg:false,
			msg:[{}],
			errFrom:{
				account:false,
				accountmsg:'',
				password:false,
				passwordmsg:''
			},
			userFrom:{
				account: "",
				password: ""
			},
		}
	},
	created() {
		document.title = "VideoHub - 用户登录 ~";
	},
	methods: {
		addMsg(){
			let temp = {msg:'123'}
			this.msg.unshift(temp)
		},
		login(){
			if(this.userFrom.account.length < 1){
				this.errFrom.accountmsg = "请输入正确的账号"
				this.errFrom.account=true
			}else if(this.userFrom.password.length < 1){
				this.errFrom.passwordmsg = "请输入正确的密码"
				this.errFrom.password=true
			}else{
				postRequest('/user/login',this.userFrom).then(res => {
					switch (res.code) {
						case 201:
							this.errFrom.accountmsg = "请输入正确的账号"
							this.errFrom.account=true
							this.errFrom.passwordmsg = "请输入正确的密码"
							this.errFrom.password=true
							break
						case 202:
							this.errFrom.accountmsg = "用户不存在"
							this.errFrom.account=true
							break
						case 206:
							this.errFrom.accountmsg = "该用户已被锁定"
							this.errFrom.account=true
							break
						case 204:
							this.errFrom.passwordmsg = "密码错误"
							this.errFrom.password=true
							break
						case 200:
							this.$cookies.set('token',res.data.token)
							break
						default:


					}
				}).catch(err => {

				})
			}
		},
	}	
}
</script>

<style scoped>
@import '@/assets/css/login.css';
</style>