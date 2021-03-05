<template>
  <div>
    <van-nav-bar
      title="详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right>
        <van-icon name="search" size="18" @click="onClickRight" />
      </template>
    </van-nav-bar>
    <div class="coverBg" />
    <img :src="infoList.url" alt="" class="cover" />
    <p class="name">{{ infoList.title }}</p>
    <p class="author">{{ infoList.author }}</p>
    <div class="btnGroud">
      <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >
        <van-button
          type="danger"
          @click="goIntoDetailPage(infoList.book_id, infoList.first_chapter_id)"
          >开始阅读</van-button
        >
        <van-button type="default">点赞</van-button>
      </van-divider>
    </div>
    <p class="latestChapters">
      更新至<span> {{ infoList.last_chapter_name }}</span>
    </p>
    <div class="tabsGroud">
      <van-tabs v-model="active">
        <van-tab title="详情">
          简介:
          幼妻记，他赤身穿梭而入长公主的睡榻，远处妻子刚刚五岁，怎凭一二之人，消罢百万铁骑？空墓记，再度裸身坠入她人新婚之居，怎能不成夫君，携人妻逃亡为她接生，捡来的妻儿又怎撼动了天下……</van-tab
        >
        <van-tab title="目录">
          <ul>
            <li
              v-for="(item, index) in chapterList"
              :key="index"
              @click="goIntoDetailPage(infoList.book_id, item.chapter_id)"
            >
              {{ item.name }}
              <van-divider
                :style="{
                  color: '#1989fa',
                  borderColor: '#1989fa',
                  padding: '0 16px',
                }"
              />
            </li>
          </ul>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, Divider, Button, Tabs, Tab } from 'vant'
export default {
  name: 'Info',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Divider.name]: Divider,
    [Button.name]: Button,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
  },
  data() {
    return {
      active: 0,
      infoList: {
        book_id: 12,
        url:
          'https://www.biquge.com.cn/files/article/image/44/44889/44889s.jpg',
        author: '李四',
        title: '百度传说',
        first_chapter_id: 1,
        last_chapter_name: '第002章  闺房莹儿',
      },

      chapterList: [
        {
          chapter_id: 1,
          name: '幼妻记简介',
        },
        {
          chapter_id: 2,
          name: '空墓记简介',
        },
        {
          chapter_id: 3,
          name: '《幼妻记》完结感言',
        },
        {
          chapter_id: 4,
          name: '大家晚安',
        },
        {
          chapter_id: 5,
          name: '第001章 穿梭长廊',
        },
        {
          chapter_id: 6,
          name: '第002章  闺房莹儿',
        },
      ],
    }
  },
  methods: {
    onClickLeft() {
      // console.log(this.$route)
      this.$router.push({
        path: '/',
      })
      // this.$router.go(-1)
    },
    onClickRight() {
      this.$router.push({
        path: '/search',
      })
    },
    goIntoDetailPage(book_id, chapter_id) {
      console.log(book_id, chapter_id)
      this.$router.push({
        path: '/detail',
        query: { book_id: book_id, chapter_id: chapter_id },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.cover {
  width: 40vw;
  height: 30vh;
  position: absolute;
  top: 6vh;
  left: 50%;
  transform: translateX(-50%);
}
.name {
  position: absolute;
  top: 36vh;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.author {
  position: absolute;
  top: 40vh;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 0.8em;
  color: gray;
}
.btnGroud {
  width: 100vw;
  position: absolute;
  top: 42vh;
  left: 50%;
  transform: translateX(-50%);
  .van-button {
    margin: 1vh 5vw;
    border-radius: 5vw;
  }
}
.latestChapters {
  width: 100vw;
  position: absolute;
  top: 52vh;
  left: 50%;
  font-size: 0.8em;
  transform: translateX(-50%);
  span {
    color: #1989fa;
  }
}
.tabsGroud {
  width: 100vw;
  position: absolute;
  margin: 0.5vh auto;
  top: 58vh;
  text-align: left;
  font-size: 0.8em;
  .van-tabs__content {
    width: 90%;
    margin: 0 auto;
  }
  ul > li {
    margin-left: 1vw;
    font-size: 1.2em;
    text-align: center;
  }
}
</style>
