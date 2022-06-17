<template>
    <div class="alert-box">
        <div v-for="(item,key) in msg" :key="key" class="alert-msg">{{item.msg}}</div>
    </div>
</template>

<script>
import { watch } from 'vue';
export default {
    name: "AlertMsg",
    props: {
        msg: Array,
    },
    setup(props) {
        let isTimeUp = false
         let timetick = null
        watch(props.msg,
            (newVal, oldVal) => {
                if(isTimeUp == false){
                    isTimeUp = true
                    timetick = window.setInterval(
                    function(){
                        let lenTemp = props.msg.length
                        if(lenTemp == 1){
                            window.clearInterval(timetick)
                        }
                        if(lenTemp > 0){
                            props.msg.length = lenTemp - 1
                        }else{
                            window.clearInterval(timetick)
                        }
                    },1000
                    )
                }

                if(props.msg.length == 0){
                    window.clearInterval(timetick)
                    timetick = null
                    isTimeUp = false
                }
                
            }
        )
    }
}
</script>

<style scoped>
.alert-box{
    width: 100%;
    height: auto;
    position: fixed;
    top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.alert-msg{
    width: auto;
    height: 40px;
    min-width: 300px;
    background-color: #f0f9eb;
    border: 1px #e1f3e8 solid;
    color: #67c23a;
    border-radius: 4px;
    transition: opacity .2s;
    overflow: hidden;
    opacity: 1;
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
}
</style>
