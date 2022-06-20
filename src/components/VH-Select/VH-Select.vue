<template>
	<div class="vue-dropdown">
		<div class="cur-name" @click="timeOutClose">{{current}}</div>
		<div :class="[isShow?'on':'',isopen ? 'list-and-search openSelect':'list-and-search disSelect']">
			<div class="search-module clearfix" v-show="isNeedSearch">
				<input class="search-text" @input='search' :placeholder="placeholder" />
			</div>
			<ul class="list-module">
				<li v-for ="(item,index) in datalist" @click="clickItem(item)" :key="index">
					<span class="list-item-text">{{labelFunc(item)}}</span>
				</li>
			</ul>
			<div class="tip-nodata" v-show="searchValue.length && !datalist.length">未找到数据</div>
		</div>
	</div>
</template>
 
<script>
 export default {
  name:"VH-Select",
  data(){
		return {
			isopen:false,
			searchValue: '',
			current: this.curData,
			datalist:[],
			isShow:false
		}
  },
  props:{
		label:null,
		vhKey:null,
		curData:String,	// 当前选中数据
		itemData:Array,	// 所有选项数据
		isNeedSearch:{	// 是否需要搜索
			type: Boolean,
			default: true
		},
		placeholder:{	// 输入框提示文本
			type: String,
			default: '搜索' 
		},
  },
  created(){
		this.datalist = this.itemData;
		// 点击组件以外的地方，收起
		document.addEventListener('click', (e) => {
			if (!this.$el.contains(e.target)){
				this.isopen = false;
				setTimeout(()=>{this.isShow = false},100)
			}
		}, false)
  },
  methods:{
		labelFunc(item){
			return item[this.label]
		},
		search(e){
			this.searchValue = e.target.value;
			this.datalist = this.itemData.filter((item)=>{
				return item[this.label].indexOf(this.searchValue) != -1;
			});
		},
		clickItem(item){
			this.isShow = false;
			let value = item[this.label]
			let key = item[this.vhKey]
			this.current = value;
			this.$emit('change',key);
		},
		timeOutClose(){
			if(this.isShow == false){
				this.isopen = true;
				this.isShow = true;
			}else{
				this.isopen = false;
				setTimeout(()=>{this.isShow = false},100)
			}
		},
	}
}
</script>
 
<style scoped>
	*{
		margin: 0;
		padding: 0;
	}
	.vue-dropdown {
		z-index:10;
		width: 150px;
        background-color: #fff;
		cursor: pointer;
		user-select:none;
		-webkit-user-select:none; 
		position: relative;
		border-radius: 4px;
	}
    input::-webkit-input-placeholder{
		font-size: 14px;
	}
    .list-module {
        max-height: 200px;
        overflow-y: auto;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
    }
    li {
		width: 100%;
		height: 34px;
		list-style: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
    }
    li:hover {
        cursor:pointer;
        color: #fff;
        background: #00a0e9;
    }
	.list-item-text{
		color: #606266;
	}
    ._self-show {
		display: block!important;
	}
    .search-module {
        position: relative;
        border-bottom: 1px solid #ccc;
    }
    .search-text {
        width: 100%;
        height: 30px;
        padding: 0 10px;
        box-shadow: none;
        outline: none;
        border: none;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
		text-align: center;
    }
    .search-icon {
        position: absolute;
        top: 24%;
        right: 0.5em;
        color: #aaa;
    }
	.list-and-search{
		display: none;
		background: #fff;
		border: 1px solid #ccc;
		position: absolute;
		width: 100%;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
	}
    .on{
        display: block;
    }

    /* 搜索 */
	.cur-name{
        width: 100%;
		height: 32px;
		line-height: 32px;
		position: relative;
		color: #777;
	}
    .cur-name:after{
        position: absolute;
        right: 9px;
        top: 13px;
        content: " ";
        width: 0;
        height: 0;
        border-right: 6px solid transparent;
        border-top: 6px solid #7b7b7b;
        border-left: 6px solid transparent;
        border-bottom: 6px solid transparent;
    }

    .show:after{
        right: 9px;
        top: 6px;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #7b7b7b;
        border-left: 6px solid transparent;
        border-top: 6px solid transparent;
    }
	.tip-nodata {
		font-size: 14px;
		padding: 10px;
	}
	.openSelect{
		animation: openDiv 0.2s ease-in;
	}
	.disSelect{
		animation: disDiv 0.2s ease-out;
	}
	@keyframes openDiv {
		0%{
			transform:translateY(-10px);
			opacity: 0;
			
		}
		25%{
			transform:translateY(-8px);
			
		}
		50%{
			transform:translateY(-5px);
			
		}
		100%{
			opacity: 1;
			transform:translateY(0px);
		}
	}
	@keyframes disDiv {
		0%{
			transform:translateY(0px);
			opacity: 1;
			
		}
		25%{
			transform:translateY(-5px);
			
		}
		50%{
			transform:translateY(-8px);
			
		}
		100%{
			opacity: 0;
			transform:translateY(-10px);
		}
	}
</style>