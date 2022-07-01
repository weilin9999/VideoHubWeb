<template>
    <div class="video-cover-box">
        <div  class="video-cover">
            
        </div>
        <div title="加载中" class="video-detail-box">
            <div class="skeleton-mini"></div>
            <div class="skeleton-middle"></div>
        </div>
        <div class="video-info">
            <div class="info-skeleton"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "VH-VideoCoverSkeleton",
    data(){
		return {

		}
    },
    props:{

    },
    methods:{
		
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

.video-cover-box .video-cover{
    position: relative;
    overflow: hidden;
    width: 350px;
    height: 190px;
    border-radius: 4px;
    cursor: pointer;
    background: linear-gradient(90deg,#f0f2f5 25%,#e6e8eb 37%,#f0f2f5 63%);
    background-size: 400% 100%;
    animation: skeleton-loading 1.4s ease infinite;
}

.video-cover-box .video-detail-box{
    margin: 5px 0;
    width: 350px;
    height: 40px;
}
.video-detail-box .skeleton-mini{
    width: 150px;
    height: 20px;
    background: linear-gradient(90deg,#f0f2f5 25%,#e6e8eb 37%,#f0f2f5 63%);
    background-size: 400% 100%;
    animation: skeleton-loading 1.4s ease infinite;
}
.video-detail-box .skeleton-middle{
    width: 300px;
    height: 20px;
    background: linear-gradient(90deg,#f0f2f5 25%,#e6e8eb 37%,#f0f2f5 63%);
    background-size: 400% 100%;
    animation: skeleton-loading 1.4s ease infinite;
}
.video-cover-box .video-info{
    width: 350px;
    height: 20px;
}
.video-info .info-skeleton{
    width: 100px;
    height: 20px;
    background: linear-gradient(90deg,#f0f2f5 25%,#e6e8eb 37%,#f0f2f5 63%);
    background-size: 400% 100%;
    animation: skeleton-loading 1.4s ease infinite;
}

@keyframes skeleton-loading {
    0% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0 50%;
    }
}
</style>
