<template>
    <div class="video-cover-box">
        <div  @click="onClickVideo()" class="video-cover">
            <img :src="cover" alt="视频封面" >
            <div class="cover-info">
                <p>{{time}}</p>
            </div>
        </div>
        <div :title="title" class="video-detail-box">
            <p  @click="onClickVideo()">{{title}}</p>
        </div>
        <div class="video-info">
            <span title="视频播放量" class="iconColor iconfont icon-shipin">{{watch}}</span>
            <span @click="goMaster()" title="视频上传者" class="iconColor iconfont icon-supplier-ship">{{master}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "VH-VideoCover",
    data(){
		return {
			
		}
    },
    props:{
        vid:null,
        uid:null,
        cover:{
			type: String,
			default: './src/assets/img/errorcover.png' 
		},
        title:{
			type: String,
			default: '无主题视频' 
		},
        time:{
            type: null,
			default: '00:00:00' 
        },
        watch:{
            type: null,
			default: '0' 
        },
        master:{
            type: null,
			default: '管理员' 
        },
    },
    methods:{
		onClickVideo(){
            let json ={'vid':this.vid,'uid':this.uid,'titile':this.title,'master':this.master}
            this.$emit('go',json);
        },
        goMaster(){
            let json ={'uid':this.uid,'master':this.master}
            this.$emit('gomaster',json);
        }
	},
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}
.video-cover-box{
    width: 370px;
    height: 280px;
    background-color: #fff;
    box-shadow: 4px 3px 12px rgb(0 36 153 / 6%);
    user-select: none;
    border-radius: 8px;
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}
.video-cover-box:hover{
    box-shadow: 4px 3px 12px rgba(0, 0, 0, 0.1);
    background-color: rgb(247, 247, 247);
}
.video-cover-box:hover .cover-info{
    width: 100%;
    display: flex;
    animation: slideup 0.3s ease-out;
}
.video-cover-box:hover .video-cover img{
    transform: scale(1.1);
}
.video-cover-box .video-cover{
    position: relative;
    overflow: hidden;
    width: 350px;
    height: 190px;
    border-radius: 4px;
    cursor: pointer;
}
.video-cover-box .video-cover img{
    width: 350px;
    height: 190px;
    transition: 0.5s all ease-in-out; 
}
.video-cover img:hover{
    transform: scale(1.1);
}

.cover-info{
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    width: auto;
    height: 25px;
    right: 0px;
    bottom: 0px;
    display: none;
    flex-direction: row-reverse;
    align-items: center;
}
.cover-info p{
    padding-right: 5px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    cursor: pointer;
}

.video-cover:hover .cover-info{
    display: flex;
    animation: slideup 0.3s ease-out;
}
@keyframes slideup {
    0% {
        height: 0px;
    }
    100% {
        height: 25px;
    }
}
.video-cover-box .video-detail-box{
    margin: 5px 0;
    width: 350px;
    height: 40px;
}
.video-detail-box p{
    text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;					
	-webkit-box-orient: vertical;
    cursor: pointer;
    width: fit-content
}
.video-detail-box p:hover{
    color: #66a6ff;
}
.video-cover-box .video-info{
    width: 350px;
    height: 20px;
}
.iconColor{
    color: #98a2aa;
    padding-right: 15px;
    font-size: 15px;
}
.iconColor::before{
    padding-right: 5px;
}
.curPointer{
    cursor: pointer;
}
.curPointer:hover{
    color: #66a6ff;
}
</style>
