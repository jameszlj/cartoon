<template>
  <div>
    <!-- <Header /> -->

    <van-tabs v-model="activeName" swipeable @click="changeAct">
      <van-tab
        v-for="(data, cate_index) in category_list"
        :key="cate_index"
        animated
        :title="data.name"
        :name="data.item"
      >
      </van-tab>
    </van-tabs>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- <van-card
              v-for="(item, detail_index) in displayList"
              :key="detail_index"
              desc="还在上大学的诸葛青云，因为一场突如其来的意外，进入到了万界影视公司，成为了公司的一名新人演员。林宛瑜：“他是一个很棒的朋友，也是一个很好的老板。”曲筱绡：“你问青云啊？他是我的好哥们。”马军：“他是我见过最优秀的卧底！”沐剑屏：“青云哥哥呀？他可是一个顶天立地大英雄呢！”诸葛青云：“其实我只是一个演员。"
              :title="item.title"
              @click="detailPage(data.item, detail_index)"
              thumb="https://www.biquge.com.cn/files/article/image/44/44889/44889s.jpg"
            /> -->
        <div class="seachRes">
          <div
            v-for="(item, detail_index) in displayList"
            :key="detail_index"
            @click="infoPage(item.book_id)"
          >
            <van-card :thumb="item.url">
              <template #title>
                <h4>{{ item.title }}</h4>
                <van-tag color="#7232dd" plain
                  >作者:{{ item.author_name }}</van-tag
                >
              </template>

              <template #desc>
                <p v-html="item.summry" />
              </template>
            </van-card>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer'
import { List, PullRefresh, Cell, Card, Tab, Tabs, Icon, Tag } from 'vant'
export default {
  name: 'Index',
  components: {
    Footer,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Cell.name]: Cell,
    [Card.name]: Card,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
    [Tag.name]: Tag,
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
      //data
      error: false,
      loading: false,
      finished: false,
      refreshing: false,
      displayList: [],
      page: 1,
      size: 10,
      total: 1,
    }
  },
  created() {
    this.getData()
  },
  watch: {
    $route(to, from) {
      if (to.name === '/') {
        //跳转的的页面的名称是"/",这里就相当于我们listview页面，或者原始页面
        let recruitScrollY = this.$store.state.recruitScrollY
        window.scroll(0, recruitScrollY)
      }
    },
  },
  methods: {
    beforeRouteLeave(to, from, next) {
      let position = window.scrollY //记录离开页面的位置
      if (position == null) position = 0
      this.$store.commit('changeRecruitScrollY', position) //离开路由时把位置存起来
      next()
    },

    infoPage(book_id) {
      console.log(book_id)
      this.$router.push({
        path: '/info',
        query: { book_id: book_id },
      })
    },
    getData() {
      this.axios
        .get('/test/getInfo', {
          data: { category: this.category, page: this.page, size: this.size },
        })
        .then((res) => {
          console.log(res.data, '1111111111')
          var code = res.data.code
          console.log(code, '3244444')
          if (code == 1) {
            this.page++
            if (this.refreshing) {
              this.displayList = []
              this.refreshing = false
            }
            var moreLIst = res.data.data.datalist
            var total = res.data.data.total
            this.displayList = this.displayList.concat(moreLIst)
            this.loading = false
            if (this.displayList.length >= total) {
              this.finished = true
            }
          } else {
            this.requestErr()
          }
        })
        .catch((error) => {
          this.requestErr()
        })
    },
    //请求失败
    requestErr() {
      this.loading = false
      this.refreshing = false
      this.error = true
    },
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
    // 上拉刷新
    onRefresh() {
      console.log('下拉')
      this.finished = false
      this.loading = true
      this.page = 1
      this.getData() //正常的请求数据的方法，数组重新赋值
    },
    // 下拉加载
    onLoad() {
      console.log('加载中', this.page)
      this.getData()
    },
  },
}
</script>

<style lang="scss" scoped>
.seachRes {
  h4 {
    margin: 0 auto;
    top: 5%;
  }
  p {
    margin: 1 auto;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .van-card {
    margin-top: 2px;
  }
  .van-tag {
    margin-left: 2px;
  }
}
</style>