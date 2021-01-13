<template>
  <div>
    <Header />
    <van-tabs v-model="activeName" swipeable @click="changeAct">
      <van-tab
        v-for="(data, index) in category_list"
        :key="index"
        :title="data.name"
        :name="data.item"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
        >
          <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
          <van-card
            v-for="(item, index) in displayList"
            :key="index"
            num="2"
            tag="标签"
            price="2.00"
            desc="描述信息"
            :title="item.title"
            thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
            origin-price="10.00"
          />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Header from '../components/Header'
import { List, PullRefresh, Cell, Card, Tab, Tabs } from 'vant'
export default {
  name: 'Index',
  components: {
    Header,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Cell.name]: Cell,
    [Card.name]: Card,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  data() {
    return {
      activeName: 'hot',
      category: 'hot',
      category_list: [
        { item: 'hot', name: '热门' },
        { item: 'recommend', name: '推荐' },
        { item: 'boy', name: '少年' },
        { item: 'girl', name: '少女' },
        { item: 'child', name: '儿童' },
        { item: 'mainland', name: '大陆' },
        { item: 'korea', name: '韩国' },
        { item: 'japan', name: '日本' },
      ],
      displayList: [],
      loading: false,
      finished: false,
      error: false,
      page: 0,
      limit: 10,
      total: 1,
      isLoding: false,
    }
  },
  methods: {
    changeAct(name, title) {
      this.category = name
      this.activeName = name
      this.loading = false
      this.finished = false
      this.page = 1
      console.log(this.category, this.activeName, '1111')
      this.displayList = []
      this.getData()
    },
    onLoad() {
      console.log('加载中')
      this.page++
      this.axios
        .get('/test/getInfo', {
          data: { category: this.category, page: this.page, limit: this.limit },
        })
        .then((res) => {
          var data1 = res.data.data.datalist
          var total1 = res.data.data.total
          if (data1) {
            this.displayList.push(...data1)
            this.loading = false
            // 数据全部加载完成
            if (data1.length >= total1) {
              this.finished = true
            }
          } else {
            this.loading = false
            this.finished = true
          }
        })
    },
    getData() {
      this.axios
        .get('/test/getInfo', {
          data: { category: this.category, page: this.page, limit: this.limit },
        })
        .then((res) => {
          console.log(res.data, '1111111111')
          var moreLIst = res.data.data.datalist
          if (moreLIst) {
            this.displayList.push(...moreLIst)
            this.loading = false
            this.finished = false
          } else {
            this.loading = false
            this.finished = true
          }
        })
        .catch((error) => {
          this.error = true
          this.loading = false
        })
    },
  },
}
</script>