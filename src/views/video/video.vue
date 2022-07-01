<template>
    <div class="main-box">
		<Headers @go="goHeader" :nosearch="true" :nocollect="true"></Headers>
        <VH-Dialog v-if="showDlialog" @close="showDlialog=false">
			<VH-Infomation v-if="dialogBox==1"></VH-Infomation>
			<VH-Upload v-if="dialogBox==2"></VH-Upload>
		</VH-Dialog>
        <div class="video-box">
            <video class="video" :src="videoUrl" type="video/mp4" preload="auto" controls="controls"></video>
            <div class="video-info">
                <p @mouseenter="showText=true" @mouseleave="showText=false" :class="showText ? 'video-title':'video-title hidde-tex'">{{videoname}}</p>
                <span v-if="relationId==0" title="添加到收藏" @click="addRelation" class="collect iconfont icon-shoucang-shoucang">收藏</span>
                <span v-if="relationId!=0" title="取消收藏" @click="removeRelation" class="iscollect iconfont icon-shoucang-shoucang"><p>已收藏</p></span>
            </div>
        </div>
        <AlertMsg ref="AlertMsg"></AlertMsg>
    </div>
</template>

<script>
import VHInfomation from '@/components/VH-Infomation/VH-Infomation.vue';
import VHUpload from '@/components/VH-Upload/VH-Upload.vue';
import config from '@/api/config';
import { postRequest } from '@/api';
export default {
    name: 'vh-video',
    components:{
		VHInfomation,
		VHUpload,
	},
    data () {
        return {
            showText:false,
            vid:null,
            showDlialog:false,
			dialogBox:1,
            videoUrl:'',
            videoData:null,
            videoname:'',
            relationId:0,
        }
    },
    created() {
        document.title =' VideoHub - 正在观看视频 ~';
        this.vid=this.$route.query.vid
        this.videoUrl = config.baseUrl.url +'/file/video/'+this.vid+'.mp4'
        this.getVideoInfo()
        this.getIsRelation()
    },
    methods:{
        goHeader(e){
			if(e.where == 'info'){
				this.dialogBox = 1
				this.showDlialog=true
			}else if(e.where == 'upload'){
				this.dialogBox = 2
				this.showDlialog=true
			}else if(e.where == 'loginout'){
				console.log("退出")
			}
		},
        getVideoInfo(){
            let json ={ 'vid': parseInt(this.vid) }
            postRequest('/watch/find',json).then(res => {
                this.videoData=res.data.list
                this.videoname = this.videoData.detail
                postRequest('/watch/plus',json).then(res => {
                   
                })
            })
        },
        getIsRelation(){
            let json ={ 'vid': parseInt(this.vid) }
            postRequest('/relation/is',json).then(res => {
                this.relationId=res.data.relation
            })
        },
        addRelation(){
            let json ={ 'vid': parseInt(this.vid) }
            postRequest('/relation/add',json).then(res => {
                this.relationId=res.data.relation
                switch (res.code) {
                    case 201:
                        this.$refs.AlertMsg.addMsg(
                            2,"你已经收藏过该视频")
                        break
                    case 202:
                        this.$refs.AlertMsg.addMsg(
                            2,"在添加收藏时产生了未知的异常"
                        )
                        break
                    case 200:
                        this.$refs.AlertMsg.addMsg(
                            1,"收藏视频成功"
                        )
                        this.relationId = res.data.relation
                        break
                    default:
                        this.$refs.AlertMsg.addMsg(
                            2,"未知错误："+res.msg
                        )
                }
            })
        },
        removeRelation(){
            let json ={ 'vid': parseInt(this.vid) }
            postRequest('/relation/delete',json).then(res => {
                 switch (res.code) {
                    case 201:
                        this.$refs.AlertMsg.addMsg(
                            2,"在删除收藏时产生了未知的异常")
                        break
                    case 200:
                        this.$refs.AlertMsg.addMsg(
                            1,"取消收藏视频成功"
                        )
                        this.relationId = 0
                        break
                    default:
                        this.$refs.AlertMsg.addMsg(
                            2,"未知错误："+res.msg
                        )
                }
            })
        },
    },
}
</script>

<style  scoped>
@import '@/assets/css/video.css';
</style>
