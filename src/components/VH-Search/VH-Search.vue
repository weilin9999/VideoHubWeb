<template>
    <div :style="'width:'+width+'px;'" class="search-box">
        <input type="text" class="search-input" :placeholder="tip" v-model="searchName" @keyup.enter="search">
        <span class="search-btn iconfont icon-sousuo" @click="search"></span>
    </div>
</template>

<script>
export default {
    name: '',
    data () {
        return {
            searchName:'',
        }
    },
    props:{
        width:{
            type: String,
			default: '420' 
        },
        tip:{
            type: String,
			default: '搜索视频' 
        }
    },
    methods:{
        search(){
            this.$emit('search',this.searchName);
        }
    },
}
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
.search-box{
    height: 40px;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #E3E5E7;
    user-select: none;
    display: flex;
    align-items: center;
    flex-direction: row;
}
.search-input{
    outline-style: none;
    background-color: #fff;
    border: 2px solid transparent;
    margin-left: 4px;
    padding: 0 8px;
    width: calc(100% - 70px);
    height: 28px;
    border-radius: 6px;
    color: #61666D;
}
.search-input:hover{
    background-color: #F1F2F3;
    color: #000;
}
.search-input:focus{
    background-color: #F1F2F3;
    color: #000;
}
.search-btn{
    margin-left: 5px;
    cursor: pointer;
    width: 32px;
    height: 32px;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
}
.search-btn:hover{
    background-color: #E3E5E7;
}
</style>
