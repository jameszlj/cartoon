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
    <div id="reader" class="reader">
      <h2 class="title">{{ contentList.title }}</h2>
      <div id="content" class="content" v-html="contentList.content" />
      <div class="btnGroud">
        <van-button plain hairline type="primary" @click="openCatalogList"
          >目录</van-button
        >
        <van-button plain hairline type="primary" @click="nextChapter(0)"
          >上一章节</van-button
        >
        <van-button plain hairline type="primary" @click="nextChapter(1)"
          >下一章节</van-button
        >
      </div>
      <van-popup v-model="showPopup" position="left">
        <ul>
          <li
            v-for="(item, index) in chapterList"
            :key="index"
            @click="goIntoDetailPage(contentList.book_id, item.chapter_id)"
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
      </van-popup>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, Button, Popup, Divider, Notify } from 'vant'
export default {
  name: 'Detail',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Divider.name]: Divider,
    [Notify.name]: Notify,
  },
  data() {
    return {
      active: 0,
      showPopup: false,
      contentList: {
        book_id: 12,
        chapter_id: 1,
        title: '幼妻记简介',
        content:
          '\n                       <p>《幼妻记》又名《彩剑红驹传》。</p><p>文图带着任务穿梭进南国王朝，不想赤身裸体落入天下第一府长小姐的睡榻内，从此开始逃亡，寻到自己的未来妻子，惊诧发现只有五岁，只好背负着她闯荡，历尽周折安定北土成为王公后，身负密信赶往南国，却发现那里危机四伏，时刻有覆灭的可能，他在南国之中最重要的三个女人：陈莹儿、南国公主、慕女节时刻有危险，于是开始了南朝爽人的争斗……</p><p>本文重要人物：</p><p>文图，主人公，穿梭师，来自现代龙城，职业不祥，爱好：读小说。一个字：侠，还一个字：爽！</p><p>符柔，女，22岁，穿梭师，来自龙城医学院，大三学生，爱好同上，据说是文图未来的老婆；北土四公主，南国总王师，后世被膜拜为符娘娘</p><p>陈莹儿，南朝陈王的女儿，一代巾帼英雄，第一美人</p><p>陈王，陈莹儿的父王，天下第一武士，天下第一王，心怀叵测</p><p>大王，南国王朝第一统领，为人忠厚</p><p>二王，大王的二弟，慕飞玲的旧交</p><p>慕飞玲，因护北王有功被赐为女节，又称慕女节，忧婉仗义</p><p>乌兰图丽，北土三公主，大王瓦赫达的妹妹，统帅求林的未婚妻</p><p>南国四公主，相貌黑俊，生性泼辣，敢言敢为</p><p>冷凌，江湖志士，经文图提点，成为南国王朝大将军</p><p>苏士，年轻文人死士，被文图救赎，南国王朝后来的政治奠基人</p><p>楠儿，大王之子，王公子，相当于太子，儿时被文图所救</p><p>百合，女，25岁，来自龙城，天文学爱好者，不慎穿越至南国，被文图所救，与文图共同建设了程家庄长廊，抗衡南北百万大军</p><p>…………</p>\n                ',
      },
      chapterList: [
        {
          chapter_id: 0,
          name: '幼妻记简介',
        },
        {
          chapter_id: 1,
          name: '空墓记简介',
        },
        {
          chapter_id: 2,
          name: '《幼妻记》完结感言',
        },
        {
          chapter_id: 3,
          name: '大家晚安',
        },
        {
          chapter_id: 4,
          name: '第001章 穿梭长廊',
        },
        {
          chapter_id: 5,
          name: '第002章  闺房莹儿',
        },
      ],
    }
  },
  methods: {
    onClickLeft() {
      // console.log(this.$route)
      const book_id = this.$route.query.book_id
      this.$router.push({
        path: '/info',
        query: { book_id: book_id },
      })
    },
    onClickRight() {
      this.$router.push({
        path: '/search',
      })
    },
    openCatalogList() {
      console.log(this.$route.query)
      this.showPopup = true
    },
    // 上下一章
    nextChapter(num) {
      const chapterList = this.chapterList
      console.log(this.$route.query.chapter_id, '00000000000000')
      const c_id = this.$route.query.chapter_id
      if (num == 0) {
        // 上一章节
        chapterList.map(async (val, index) => {
          if (val.chapter_id.toString() == c_id) {
            if (chapterList[index - 1]) {
              this.$router.push({
                path: '/detail',
                query: {
                  book_id: this.$route.query.book_id,
                  chapter_id: chapterList[index - 1].chapter_id,
                },
              })
              // this.routerPush(this.$route.query.key, chapterList[index - 1].url)

              this.toTop()
            } else {
              this.$notify({ type: 'warning', message: '没有了哦' })
              // Notify({ type: 'warning', message: '没有了哦' })
            }
          }
        })
      } else if (num == 1) {
        // 下一章节
        chapterList.map(async (val, index) => {
          if (val.chapter_id.toString() == c_id) {
            if (chapterList[index + 1]) {
              this.$router.push({
                path: '/detail',
                query: {
                  book_id: this.$route.query.book_id,
                  chapter_id: chapterList[index + 1].chapter_id,
                },
              })
              this.toTop()
            } else {
              this.$notify({ type: 'warning', message: '没有了哦' })
            }
          }
        })
      } else {
        console.log('没有章节')
      }
    },
    toTop() {
      // toTop 滚动到顶部
      var currentPosition, timer
      var speed = 20
      timer = setInterval(function () {
        currentPosition =
          document.documentElement.scrollTop || document.body.scrollTop
        // currentPosition =
        // document.querySelector('#content').scrollTop || document.querySelector('#content').scrollTop
        currentPosition -= speed // speed变量
        if (currentPosition > 0) {
          window.scrollTo(0, currentPosition)
        } else {
          window.scrollTo(0, 0)
          clearInterval(timer)
        }
      }, 1)
    },
    goIntoDetailPage(book_id, chapter_id) {
      console.log(book_id, chapter_id)
      this.$router.push({
        path: '/detail',
        query: { book_id: book_id, chapter_id: chapter_id },
      })
      this.toTop()
      this.showPopup = false
    },
  },
}
</script>

<style lang="scss" scoped>
html,
body {
  background-color: #e9e4d5;
}
.reader {
  background-color: #e9e4d5;
  .title {
    margin-top: 0vh;
  }
  .content {
    width: 95vw;
    margin: 0 auto;
    font-size: 1.1em;
    text-align: left;
  }
  .btnGroud {
    .van-button {
      color: black;
      margin-left: 3vw;
      margin-bottom: 2vh;
    }
    .button-default-color {
      color: white;
    }
  }
}
</style>