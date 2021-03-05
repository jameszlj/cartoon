<template>
  <div>
    <!-- vant搜索 -->
    <van-nav-bar
      title="Search"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <van-search
      v-model="keyword"
      placeholder="请输入搜索关键词"
      @search="handelClickSearch(keyword, 0)"
    />

    <!-- 搜索历史 -->
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    />
    <div v-show="show" class="seachHis">
      <div class="seachHisHead">
        <h4>搜索历史:</h4>
        <van-button icon="delete" type="primary" size="mini"
          >清空历史</van-button
        >
      </div>
      <div>
        <van-empty v-if="hisList.length == 0" description="暂无历史记录" />
        <van-tag
          v-for="(item, index) in hisList"
          :key="index"
          size="large "
          type="primary"
          @click="handelClickSearch(item, 1)"
          >{{ item }}</van-tag
        >
      </div>
    </div>
    <div v-show="!show" class="seachRes">
      <div
        v-for="(item, index) in list"
        :key="index"
        @click="goBookInfo(item.url, key)"
      >
        <van-card :thumb="item.cover">
          <template #title>
            <h4>{{ item.name }}</h4>
            <van-tag plain type="danger">作者:{{ item.author }}</van-tag>
          </template>

          <template #desc>
            <p v-html="item.summry" />
          </template>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Search, Divider, Button, Tag, Card, Empty } from 'vant'
export default {
  name: 'Search',
  components: {
    [NavBar.name]: NavBar,
    [Search.name]: Search,
    [Divider.name]: Divider,
    [Button.name]: Button,
    [Tag.name]: Tag,
    [Card.name]: Card,
    [Empty.name]: Empty,
  },
  data() {
    return {
      keyword: '',
      show: true,
      list: [], //所有数据
      showList: [], //搜索提示数据
      hisList: [], //搜索记录
    }
  },
  created() {},

  methods: {
    onClickLeft() {
      //返回
      this.$router.push({
        path: '/',
      })
    },
    getLocalStore() {
      const hisres = localStorage.getItem('keyword')
      if (hisres) {
        const list = JSON.parse(hisres)
        this.hisList = list
        console.log(list)
      }
    },
    handelClickSearch(keyword, type) {
      this.keyword = keyword
      const obj = {
        keyword: keyword,
        limit: 0,
      }
      const res = this.getSearchRes(obj)
      console.log(res)
    },
    getSearchRes(obj) {
      return this.axios
        .get('/test/search')
        .then((res) => res.data.data)
        .catch((error) => error)
    },
  },
}
</script>

<style>
.search-host {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>