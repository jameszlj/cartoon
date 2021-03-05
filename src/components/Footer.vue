<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">小说</van-tabbar-item>
      <van-tabbar-item icon="friends-o">漫画</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'Footer',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  data() {
    return {
      active: 0,
    }
  },
}
</script>