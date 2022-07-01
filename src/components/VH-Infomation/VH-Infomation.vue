<template>
    <div class="infomation-box">
        <div class="infomation-border">
            <div class="infomation-menu">
                <a @click="selectType=1" class="user-btn"><div class="user-btn-inner"><span class="col-right-6 iconfont icon-changyongxinxi"></span><p>修改头像</p></div><span class="iconfont icon-youxiang"></span></a>
                <a @click="selectType=2" class="user-btn"><div class="user-btn-inner"><span class="col-right-6 iconfont icon-mima"></span><p>修改密码</p></div><span class="iconfont icon-youxiang"></span></a>
            </div>
            <div class="infomation-context">
                <div v-if="selectType==1" class="avatar-box">
                    <img :src="useravatar">
                    <div class="file-box">
                        <p>{{filename}}</p>
                        <a href="javascript:;" class="file">选择文件
                            <input type="file" id="file" @change="upload" accept=".jpg,.png,.jpeg">
                        </a>
                    </div>
                    <button class="btn" @click="uploadAvatar">确认修改</button>
                </div>
                <div v-if="selectType==2" class="password-box">
                    <div class="pwd-b">
                        <form>
                            <div class="user-box">
                                <input type="password"  v-model="pwdForm.oldpwd" required autocomplete="on" @change="errForm.oldpwd=false">
                                <label>旧密码</label>
                                <span v-if="errForm.oldpwd"><i class="col-ri-5 iconfont icon-cuowu1"></i><p>{{errForm.oldpwdmsg}}</p></span>
                            </div>
                            <div class="user-box">
                                <input type="password"  v-model="pwdForm.newpwd" required autocomplete="on" @change="errForm.newpwd=false">
                                <label>新密码</label>
                                <span v-if="errForm.newpwd"><i class="col-ri-5 iconfont icon-cuowu1"></i><p>{{errForm.newpwdmsg}}</p></span>
                            </div>
                            <div class="user-box">
                                <input type="password"  v-model="pwdForm.repwd" required autocomplete="on" @change="errForm.repwd=false">
                                <label>重复新密码</label>
                                <span v-if="errForm.repwd"><i class="col-ri-5 iconfont icon-cuowu1"></i><p>{{errForm.repwdmsg}}</p></span>
                            </div>
                        </form>
                        <button class="btn-m" @click="changePwd">确认修改</button>
                    </div>
                </div>
            </div>
        </div>
        <AlertMsg ref="AlertMsg"></AlertMsg>
    </div>
</template>

<script>
import { postRequest } from '@/api';
import cookies from 'vue-cookies';
import config from '@/api/config';
export default {
    name: 'VH-Infomation',
    data () {
        return {
            filename:'',
            useravatar:'',
            origin:null,
            selectType:1,
            uploadImgData:null,
            errForm:{
                oldpwd:false,
                oldpwdmsg:'',
                newpwd:false,
                newpwdmsg:'',
                repwd:false,
                repwdmsg:'',
            },
            pwdForm:{
                oldpwd:'',
                newpwd:'',
                repwd:''
            }
        }
    },
    props:{
        
    },
    created() {
        const origin = cookies.get('origin');
        this.origin=origin;
        this.useravatar=config.baseUrl.url +'/file/avatar/'+ origin.avatar
    },
    methods:{
        uploadAvatar(){
            if(this.uploadImgData == null){
                this.$refs.AlertMsg.addMsg(
					2,"请选择上传的头像"
				)
                return
            }
            let formFile = new FormData
            formFile.append('file',this.uploadImgData)
            postRequest('/userinfo/upload/avatar',formFile).then(res => {
                switch (res.code) {
                    case 201:
                        this.$refs.AlertMsg.addMsg(
                            2,"未上传文件"
                        )
                        break
                    case 202:
                        this.$refs.AlertMsg.addMsg(
                            2,"文件大于2M"
                        )
                        break
                    case 203:
                        this.$refs.AlertMsg.addMsg(
                            2,"文件类型不符合要求"
                        )
                        break
                    case 204:
                        this.$refs.AlertMsg.addMsg(
                            2,"在存储头像时出现了异常"
                        )
                        break
                    case 200:
                        this.$refs.AlertMsg.addMsg(
                            1,"头像修改成功"
                        )
                        this.origin.avatar=res.data.avatar;
                        this.$cookies.set('origin',this.origin)
                        window.open('./','_self')
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
        },
        upload(e){
            //e.target指向事件执行时鼠标所点击区域的那个元素，那么为input的标签，
            // 可以输出 e.target.files 看看，这个files对象保存着选中的所有的图片的信息。
            // console.log(e.target.files[0])
            //------------------------------------------------------     
            // 既然如此，循环这个files对象，用for of 循环，     
            let item = e.target.files[0]
            this.uploadImgData = item
            //正则表达式，判断每个元素的type属性是否为图片形式，如图
            if (item.type !== 'image/png' && item.type !== 'image/jpeg') {
                // 提示只能是图片，return
                this.$refs.AlertMsg.addMsg(
                    2,"只能选择图片类型为jpg,png格式"
                )
                return;
            }else if(item.type==undefined){
                this.$refs.AlertMsg.addMsg(
					2,"只能选择图片类型为jpg,png格式"
				)
                return;
            }
            // 保存下当前 this ，就是vue实例
            var _this = this;
            _this.filename = item.name
            // 创建一个FileReader()对象，它里面有个readAsDataURL方法
            let reader = new FileReader();
            // readAsDataURL方法可以将上传的图片格式转为base64,然后在存入到图片路径, 
            //这样就可以上传电脑任意位置的图片                            
            reader.readAsDataURL(item);
            //文件读取成功完成时触发
            reader.addEventListener('load',function(){
            //  reader.result返回文件的内容。
            //只有在读取操作完成后，此属性才有效，返回的数据的格式取决于是使用哪种读取方法来执行读取操作的。
                //给数组添加这个文件也就是图片的内容
                _this.useravatar=reader.result
            })
        },
        changePwd(){
            if(this.pwdForm.oldpwd.length < 1){
				this.errForm.oldpwdmsg = "请输入正确的旧密码"
				this.errForm.oldpwd=true
			}else if(this.pwdForm.newpwd.length < 1){
				this.errForm.newpwdmsg = "请输入正确的新密码"
				this.errForm.newpwd=true
			}else if(this.pwdForm.repwd.length < 1){
				this.errForm.repwdmsg = "请重复新密码"
				this.errForm.repwd=true
			}else if(this.pwdForm.repwd != this.pwdForm.newpwd){
				this.errForm.repwdmsg = "与新密码不一致"
				this.errForm.repwd=true
			}else{
                let formPost = {
                    "account": this.origin.account,
                    "password": this.pwdForm.oldpwd,
                    "repassword": this.pwdForm.newpwd,
                    "newpassword": this.pwdForm.repwd
                }
				postRequest('/userinfo/update/password',formPost).then(res => {
					switch (res.code) {
						case 201:
							this.errForm.newpwdmsg = "两次密码不一致"
							this.errForm.newpwd=true
							this.errForm.repwdmsg = "两次密码不一致"
							this.errForm.repwd=true
							break
						case 202:
							this.errForm.newpwdmsg = "密码不符合要求"
							this.errForm.newpwd=true
							break
						case 203:
							this.$refs.AlertMsg.addMsg(
								2,"密码更改时产生异常"
							)
							break
						case 200:
							this.$refs.AlertMsg.addMsg(
								1,"修改密码成功"
							)
                            cookies.remove('origin');
                            window.open('./login','_self')
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
    },
}
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
.infomation-box{
    width: 100%;
    height: 100%;
    padding: 0 30px 30px 30px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: row-reverse;
}
.infomation-border{
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 3px 12px rgb(0 36 153 / 6%);
    display: flex;
}
.infomation-menu{
    width: 230px;
    height: 100%;
    border-right: 1px rgb(0 36 153 / 6%) solid;
}
.user-btn{
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    background-color: transparent;
    margin-bottom: 2px;
    padding: 10px 14px;
    border-radius: 8px;
    color: #61666D;
    font-size: 14px;
    cursor: pointer;
    transition: background-color .3s;
    user-select: none;
}
.user-btn:hover{
    background-color: #E3E5E7;
}
.user-btn .user-btn-inner{
    display: flex;
    align-items: center;
}
.col-right-6{
    margin-right: 16px;
}

.infomation-context{
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.avatar-box{
    padding-top: 50px;
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    animation: showBoxUp .5s;
    user-select: none;
}
.avatar-box img{
    width: 150px;
    height: 150px;
    border-radius: 50%;
}
.file-box{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 30px;
}
.file-box p{
    margin-right: 10px;
}
.file {
    position: relative;
    display: inline-block;
    background-color: #409eff;
    border: 1px solid #2D55A6;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #fff;
    text-decoration: none;
    text-indent: 0;
    line-height: 30px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #fff;
    text-decoration: none;
}
#file{
    cursor: pointer;
}

.btn{
    margin-top: 30px;
    margin-left: 11px;
    width: 90px;
    height: 40px;
    background-color: #409eff;
    border: 1px solid #2D55A6;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 15px;
}
.btn-m{
    width: 90px;
    height: 40px;
    background-color: #409eff;
    border: 1px solid #2D55A6;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 15px;
}
.btn:hover{
    background: #AADFFD;
    border-color: #78C3F3;
    color: #fff;
}
.btn-m:hover{
    background: #AADFFD;
    border-color: #78C3F3;
    color: #fff;
}

.password-box{
    padding-top: 50px;
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    animation: showBoxUp .5s;
    user-select: none;
}
.pwd-b{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.user-box{
    position: relative;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 250px;
}
.user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #000;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
}
.user-box label {
    position: absolute;
    top:0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #409eff;
    pointer-events: none;
    transition: .5s;
}
.user-box span {
    position: absolute;
    top:0;
    right: 0;
    padding: 10px 0;
    font-size: 10px;
    color: #F2B988;
    pointer-events: none;
    transition: .5s;
    display: flex;
    align-items: center;
}

.user-box input:focus ~ label,
.user-box input:valid ~ label {
    top: -20px;
    left: 0;
    color: #F2B988;
    font-size: 12px;
}
@keyframes showBoxUp{
	0%{
		opacity: 0;
		transform:translateY(-5px);
	}
	100%{
		opacity: 1;
		transform:translateY(0px);
	}
}
</style>
