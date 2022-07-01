<template>
	<div class="main-login-box">

		<div v-if="!isReg" class="login-box">
			<h1>登录</h1>
			<div class="login-box-inner">
				<form>
					<div class="user-box">
						<input type="text" v-model="userForm.account" required autocomplete="on" @change="errForm.account=false">
						<label>账号</label>
						<span v-if="errForm.account"><i class="col-ri-5 iconfont icon-cuowu1"></i><p>{{errForm.accountmsg}}</p></span>
					</div>
					<div class="user-box">
						<input type="password" v-model="userForm.password" autocomplete="on" required @change="errForm.password=false">
						<label>密码</label>
						<span v-if="errForm.password"><i class="col-ri-5 iconfont icon-cuowu1"></i><p>{{errForm.passwordmsg}}</p></span>
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
						<input type="text" v-model="regForm.account" required autocomplete="on" @change="regErrForm.account=false">
						<label>账号</label>
						<span v-if="regErrForm.account"><i class="col-ri-5 iconfont icon-cuowu1"></i><p>{{regErrForm.accountmsg}}</p></span>
					</div>
					<div class="user-box">
						<input type="text" v-model="regForm.username" required autocomplete="on" @change="regErrForm.username=false">
						<label>用户名</label>
						<span v-if="regErrForm.username"><i class="col-ri-5 iconfont icon-cuowu1"></i><p>{{regErrForm.usernamemsg}}</p></span>
					</div>
					<div class="user-box">
						<input type="password" v-model="regForm.password" required autocomplete="on" @change="regErrForm.password=false">
						<label>密码</label>
						<span v-if="regErrForm.password"><i class="col-ri-5 iconfont icon-cuowu1"></i><p>{{regErrForm.passwordmsg}}</p></span>
					</div>
					<div class="user-box">
						<input type="password" v-model="regForm.repassword" required autocomplete="on" @change="regErrForm.repassword=false">
						<label>重复密码</label>
						<span v-if="regErrForm.repassword"><i class="col-ri-5 iconfont icon-cuowu1"></i><p>{{regErrForm.repasswordmsg}}</p></span>
					</div>
				</form>
			</div>
			<div class="login-bottom-box">
				<button class="login-btn" @click="reg()">注册</button>
			</div>
		</div>
		<AlertMsg ref="AlertMsg"></AlertMsg>
	</div>
</template>

<script>
import { postRequest } from '@/api';
export default {
	name: 'login',
	data() {
		return {
			isReg:false,
			errForm:{
				account:false,
				accountmsg:'',
				password:false,
				passwordmsg:''
			},
			userForm:{
				account: '',
				password: ''
			},
			regForm:{
				account: '',
				username:'',
				password: '',
				repassword:''
			},
			regErrForm:{
				account:false,
				accountmsg:'',
				username:false,
				usernamemsg:'',
				password:false,
				passwordmsg:'',
				repassword:false,
				repasswordmsg:''
			}
		}
	},
	created() {
		document.title =' VideoHub - 用户登录 ~';
		const route = this.$router.currentRoute._value.path
		if(route == '/register'){
			this.isReg=true
		}
	},
	methods: {
		login(){
			if(this.userForm.account.length < 1){
				this.errForm.accountmsg = "请输入正确的账号"
				this.errForm.account=true
			}else if(this.userForm.password.length < 1){
				this.errForm.passwordmsg = "请输入正确的密码"
				this.errForm.password=true
			}else{
				postRequest('/user/login',this.userForm).then(res => {
					switch (res.code) {
						case 201:
							this.errForm.accountmsg = "请输入正确的账号"
							this.errForm.account=true
							this.errForm.passwordmsg = "请输入正确的密码"
							this.errForm.password=true
							break
						case 202:
							this.errForm.accountmsg = "用户不存在"
							this.errForm.account=true
							break
						case 206:
							this.errForm.accountmsg = "该用户已被锁定"
							this.errForm.account=true
							break
						case 204:
							this.errForm.passwordmsg = "密码错误"
							this.errForm.password=true
							break
						case 200:
							this.$cookies.set('origin',res.data)
							this.$router.push({ path: '/' })
							break
						default:
							this.$refs.AlertMsg.addMsg(
								2,"未知错误："+res.msg
							)
					}
				}).catch(err => {
					this.$refs.AlertMsg.addMsg(
						2,"异常错误："+err
					)
				})
			}
		},
		reg(){
			if(this.regForm.account.length < 1){
				this.regErrForm.accountmsg = "请输入正确的账号"
				this.regErrForm.account=true
			}else if(this.regForm.username.length < 1){
				this.regErrForm.usernamemsg = "请输入正确的用户名"
				this.regErrForm.username=true
			}else if(this.regForm.password.length < 1){
				this.regErrForm.passwordmsg = "请输入正确的密码"
				this.regErrForm.password=true
			}else if(this.regForm.repassword.length < 1){
				this.regErrForm.repasswordmsg = "请输入正确的密码"
				this.regErrForm.repassword=true
			}else if(this.regForm.password != this.regForm.repassword){
				this.regErrForm.repasswordmsg = "密码不一致"
				this.regErrForm.repassword=true
			}else{
				postRequest('/user/register',this.regForm).then(res => {
					switch (res.code) {
						case 201:
							this.$refs.AlertMsg.addMsg(
								1,"注册个更新时产生异常")
							break
						case 202:
							this.regErrForm.accountmsg = "注册账号已存在"
							this.regErrForm.account=true
							break
						case 203:
							this.regErrForm.usernamemsg = "注册用户名已存在"
							this.regErrForm.username=true
							break
						case 204:
							this.$refs.AlertMsg.addMsg(
								2,"注册时产生异常"
							)
							break
						case 205:
							this.regErrForm.accountmsg = "账号不符合要求"
							this.regErrForm.account=true
							break
						case 206:
							this.regErrForm.usernamemsg = "用户名不符合要求"
							this.regErrForm.username=true
							break
						case 207:
							this.regErrForm.usernamemsg = "该用户名已被占用"
							this.regErrForm.username=true
							break
						case 208:
							this.regErrForm.passwordmsg = "密码不符合要求"
							this.regErrForm.password=true
							break
						case 200:
							this.$refs.AlertMsg.addMsg(
								1,"注册成功"
							)
							setTimeout(()=>{this.isReg=false},300)
							break
						default:
							this.$refs.AlertMsg.addMsg(
								2,"未知错误："+res.msg
							)
					}
				}).catch(err => {
					this.$refs.AlertMsg.addMsg(
						2,"异常错误："+err
					)
				})
			}
		}
	}	
}
</script>

<style scoped>
@import '@/assets/css/login.css';
</style>