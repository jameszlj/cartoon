<template>
  <div>
    <van-search v-model="kw" shape="round" background="red" placeholder="关键字或作者" @focus="onSearch"/>
    
    <van-tabs type="line" background='white' swipeable @click="onClick">
      <van-tab v-for="data in category_list" :key="data.item" :title="data.name" :name="data.item">
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Search, Tab, Tabs } from 'vant';
export default {
  name: 'Header',
  data(){
    return {
      kw:"",
      category_list:[{"item":"hot","name":"热门"},
      {"item":"recommend","name":"推荐"},
      {"item":"boy","name":"少年"},
      {"item":"girl","name":"少女"},
      {"item":"child","name":"儿童"},
      {"item":"mainland","name":"大陆"},
      {"item":"korea","name":"韩国"},
      {"item":"japan","name":"日本"}]
    }
  },
  components:{
    [Search.name]: Search,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  methods:{
    
    onSearch(kw){
      console.log(kw)
      this.$router.push({
      path:'/search/'
      
    })
    },
    onClick(name,title){
      console.log(name,title)
      this.$router.push({
        path:"/display/"+name
      })
    }
  }
}
</script>