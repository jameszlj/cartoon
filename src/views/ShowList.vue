<template>
  <div>
    <van-search  @cancel="back" autofocus show-action shape="round" v-model="kw" placeholder="请输入搜索关键词"/>

	 <van-card
		v-for="(item,index) in showGoods" :key="index"
	    num="2"
	    price="2.00"
	    desc="描述信息"
	    :title="item.title"
	    thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
	 />
	
  </div>
</template>

<script>
import { Card, Search,Icon } from 'vant'
export default {
  name:"ShowList",
  components:{
    [Icon.name]: Icon,
    [Search.name]: Search,
    [Card.name]:Card,
  },
	data(){
		return{
      kw:"",
			showGoods:[]
		}
  },
	created() {
		let kw = this.$route.query.kw
		
		this.$axios.get('/test/search').then(res=>{
			let goods = res.data.list
				
			goods.map(item=>{
				if(item.title.includes(kw)){
					this.showGoods.push(item)
				}
			})
		})
		
  },
  methods:{
    back(){ //返回
			this.$router.push({
				path:'/search'
			})
    }
  },
}
</script>

<style>

</style>