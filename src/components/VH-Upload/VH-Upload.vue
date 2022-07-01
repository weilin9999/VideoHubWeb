<template>
    <div class="upload-box">
        <div class="upload-inner">
            <form class="top-bard">
                <div class="user-box">
                    <input type="password"  v-model="uploadForm.title" required autocomplete="on" @change="errForm.title=false">
                    <label>视频标题</label>
                    <span v-if="errForm.title"><i class="col-ri-5 iconfont icon-cuowu1"></i><p>{{errForm.titlemsg}}</p></span>
                </div>
                <div class="video-area">
                    <VH-Select width="170" @change="selectClass" v-model="select" :curData="curData" :itemData="itemData" label="item" vh-key="m"></VH-Select>
                </div>
            </form>
            <div>
                <div class="file-box">
                    <p>{{filename}}</p>
                    <a href="javascript:;" class="file">选择文件
                        <input type="file" id="file" @change="upload" accept=".mp4">
                    </a>
                </div>
            </div>
            <button class="btn-m" @click="uploadVideo">上传视频</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VH-Upload',
    data () {
        return {
            uploadForm:{
                title:'',
                class:null,
            },
            errForm:{
                title:false,
                titlemsg:'',
            },
            select:'',
			curData: '选择视频投稿区',
			itemData: [{m:'m1',item:'选项1',key:2},{m:'m2',item:'选项2',key:4},{m:'m3',item:'选项3',key:6},{m:'m4',item:'选项4',key:8},
			{m:'m5',item:'选项5',key:10},{m:'m6',item:'选项6',key:12},{m:'m7',item:'选项7',key:14},{m:'m8',item:'选项8',key:16}],
            filename:'',
        }
    },
    props:{
        
    },
    methods:{
        selectClass(e){
            console.log(e)
        },
        upload(e){
            //e.target指向事件执行时鼠标所点击区域的那个元素，那么为input的标签，
            // 可以输出 e.target.files 看看，这个files对象保存着选中的所有的图片的信息。
            console.log(e.target.files[0])
            //------------------------------------------------------     
            // 既然如此，循环这个files对象，用for of 循环，     
            let item = e.target.files[0]
            //正则表达式，判断每个元素的type属性是否为图片形式，如图
            if (item.type !== 'video/mp4') {
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
            
        },
        uploadVideo(){

        },
    },
}
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
video{
    width: 480px;
    height: 300px;
}
.upload-box{
    width: 100%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 8px;
}
.upload-inner{
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 3px 12px rgb(0 36 153 / 6%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    animation: showBoxUp .5s;
    user-select: none;
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
.top-bard{
    display: flex;
    flex-direction: row;
    align-items: center;
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
.video-area{
    width: auto;
    padding: 0px 0px 30px;
    box-sizing: border-box;
    margin-left: 25px;
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
.btn-m{
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
.btn-m:hover{
    background: #AADFFD;
    border-color: #78C3F3;
    color: #fff;
}
</style>
