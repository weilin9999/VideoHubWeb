<template>
    <div class="class-box">
        <div class="class-inner-box">
            <button :class="select==-1 ? 'btn avatice':'btn'" @click="onclick(0,-1)" >全部</button>
            <button :class="select==key ? 'btn avatice':'btn'" v-for="(item,key) in listData" :key="key" @click="onclick(item,key)">{{labelFunc(item)}}</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VH-ClassSelect',
    data () {
        return {
            listData:[],
            select:-1,
        }
    },
    props:{
        itemData:Array,
        label:null,
		vhKey:null,
        cid:null,
    },
    watch:{
        itemData(news,olds){
            this.listData = news
        },
        cid(news,olds){
            if(news==0){
                this.select = -1
            }
        }
    },
    created(){
		this.listData = this.itemData;
    },
    methods:{
        labelFunc(item){
			return item[this.label]
		},
        onclick(item,keys){
            this.select=keys
            if(item == 0){
                this.$emit('select',0)
            }else{
                let key = item[this.vhKey]
                this.$emit('select',key)
            }
        }
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
    padding: 0 38px;
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
    z-index: 1;
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

.class-inner-box:hover{
    animation: showDropUp .5s;
    animation-fill-mode: forwards;
}

@keyframes showDropUp{
	0%{
		transform:translateY(-5px);
        height: 65px;
	}
	100%{
		transform:translateY(0px);
        height: 256px;
        overflow-y: auto;
	}
}
.avatice{
    color: #00aeec;
}
</style>
