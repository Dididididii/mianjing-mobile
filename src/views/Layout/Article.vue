<template>
  <div class="article-page">
    <nav class="my-nav van-hairline--bottom">
      <a href="javascript:;" :class="{ active:sorter == 'weight_desc' }" @click="changeSorter('weight_desc')">推荐</a>
      <a href="javascript:;" :class="{ active:sorter == null }" @click="changeSorter(null)">最新</a>
      <div class="logo">
        <img src="@/assets/logo.png" alt />
      </div>
    </nav>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <ArticleCell v-for="item in articleList" :key="item.id" :artcle="item" :link="`/detail?id=${item.id}`" />
    </van-list>
  </div>
</template>

<script>
// 引入获取面经数据接口方法
import { getArtcleAPI } from '@/api/artcle'

export default {
  name: 'article-page',
  data() {
    return {
      articleList: [], // 面经列表数据
      current: 1, // 当前页
      sorter: 'weight_desc', // null为最新 weight_desc为推荐
      loading: false,
      finished: false,
      total: 0
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(async () => {
        try {
          const { data: res } = await getArtcleAPI({ current: this.current++, sorter: this.sorter })
          // res.data.rows.forEach(item => {
          //   this.articleList.push(item)
          // })
          // 把数据向数组后面追加
          this.articleList.push(...res.data.rows)
          this.total = res.data.total // 记录数据总量
        } catch (err) {
          if (err.response) {
            this.$toast(err.response.data.message)
          } else {
            this.$toast('网络错误，请稍后重试')
          }
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.articleList.length >= this.total) {
          this.finished = true
        }
      }, 1000)
    },
    changeSorter(val) {
      // 改变sorter获取新数据
      this.sorter = val
      this.current = 1
      this.articleList = []
      this.loading = true
      this.onLoad()
    }
  }
}
</script>

<style lang="less" scoped>
.article-page {
  margin-bottom: 50px;
  margin-top: 44px;
  .my-nav {
    height: 44px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    display: flex;
    align-items: center;
    > a {
      color: #999;
      font-size: 14px;
      line-height: 44px;
      margin-left: 20px;
      position: relative;
      transition: all 0.3s;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 2px;
        background: #222;
        transition: all 0.3s;
      }
      &.active {
        color: #222;
        &::after {
          width: 14px;
        }
      }
    }
    .logo {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      > img {
        width: 64px;
        height: 28px;
        display: block;
        margin-right: 10px;
      }
    }
  }
}
</style>
