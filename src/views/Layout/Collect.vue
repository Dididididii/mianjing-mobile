<template>
  <div class="collect-page">
    <!-- 标题 -->
    <van-nav-bar title="收藏" />
    <!-- 卡片组件 -->
    <article-cell :artcle="item" :link="`/detail?id=${item.id}`" v-for="item in collectList" :key="item.id"></article-cell>
  </div>
</template>

<script>
// 引入获取收藏接口
import { getArtcleLikesAPI } from '@/api/artcle'
import ArticleCell from '@/components/ArticleCell.vue'

export default {
  components: { ArticleCell },
  name: 'collect-page',
  data() {
    return {
      collectList: []
    }
  },
  methods: {
    // 封装获取收藏接口方法
    async getArtcleCollect() {
      try {
        const { data: res } = await getArtcleLikesAPI(2)
        // console.log(res)
        this.collectList = res.data.rows
      } catch (err) {
        if (err.response) {
          this.$toast(err.response.data.message)
        } else {
          this.$toast('网络异常，请稍后重试')
        }
      }
    }
  },
  created() {
    this.getArtcleCollect()
  }
}
</script>

<style lang="less" scoped>
.collect-page {
  margin-bottom: 50px;
  // margin-top: 44px;
}
</style>
