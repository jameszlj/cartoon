<template>
  <div>
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
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
export default {
  name: 'Header',
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
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  methods: {},
}
</script>