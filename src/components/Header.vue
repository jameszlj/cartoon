<template>
  <div>
    <van-search
      v-model="kw"
      shape="round"
      background="red"
      placeholder="关键字或作者"
      @focus="onSearch"
    />
  </div>
</template>

<script>
import { Search, Tab, Tabs } from 'vant'
export default {
  name: 'Header',
  data() {
    return {
      kw: '',
    }
  },
  components: {
    [Search.name]: Search,
  },
  methods: {
    onSearch(kw) {
      console.log(kw)
      this.$router.push({
        path: '/search/',
      })
    },
  },
}
</script>