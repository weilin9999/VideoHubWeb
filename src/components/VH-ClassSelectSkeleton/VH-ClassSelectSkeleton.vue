<template>
    <div class="class-box">
        <div class="class-inner-box">
            <div class="class-skeleton"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VH-ClassSelectSkeleton',
    data () {
        return {

        }
    },
    props:{
        
    },
    watch:{

    },
    created(){

    },
    methods:{

    },
}
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
.class-box{
    width: 100%;
    height: 65px;
    box-sizing: content-box;
    padding: 0 40px;
    position: relative;
    
}
.class-inner-box{
    width: 1260px;
    height: 65px;
    background-color: #fff;
    box-shadow: 0 3px 12px rgb(0 36 153 / 6%);
    box-sizing: content-box;
    border-radius: 6px;
    position: absolute;
    overflow: hidden;
    text-align: center;
    z-index: 300;
    display: flex;
    align-items: center;
    justify-content: center;
}
.btn{
    min-width: 90px;
    display: inline-block;
    box-sizing: content-box;
    width: auto;
    height: 32px;
    border: 1px solid #F1F2F3;
    border-radius: 6px;
    background-color: #F6F7F8;
    color: #61666D;
    text-align: center;
    font-weight: 400;
    transition: background-color .3s,color .3s;
    cursor: pointer;
    padding: 5px 10px;
    margin: 10px;
}
.btn:hover{
    background-color: #E3E5E7;
    color: #18191C;
}

.class-skeleton{
    width: 80%;
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
