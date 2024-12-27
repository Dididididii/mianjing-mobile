<template>
  <div class="detail-page">
    <van-nav-bar left-text="返回" @click-left="$router.back()" fixed title="面经详细" />
    <header class="header">
      <h1>{{ artcleItem.stem }}</h1>
      <p>
        创建时间 {{ this.artcleItem.createdAt }} | {{this.artcleItem.views}} 浏览量 |
        {{this.artcleItem.likeCount}} 点赞数
      </p>
      <p>
        <img :src="this.artcleItem.avatar" alt />
        <span>{{this.artcleItem.creator}}</span>
      </p>
    </header>
    <main class="body" v-html="this.artcleItem.content"></main>
    <div class="opt">
      <van-icon name="like-o" :class="{active:isLiked=== true }" @click="userArtcleLikes(1)" />
      <van-icon name="star-o" :class="{active:isCollected === true}" @click="userArtcleLikes(2)" />
    </div>
  </div>
</template>
<script>
// 引入面经详情页接口, 收藏喜欢接口, 获取收藏喜欢列表接口
import { artcleShowAPI, artcleLikesAPI, getArtcleLikesAPI } from '@/api/artcle'

export default {
  name: 'detail-page',
  data() {
    return {
      artcleItem: {},
      isLiked: false,
      isCollected: false
    }
  },
  methods: {
    // 获取用户喜欢/收藏裂变
    async getArtcleLikes(optType) {
      try {
        const { data: res } = await getArtcleLikesAPI(optType)
        // console.log(res.data.rows)
        if (optType === 1) {
          this.isLiked = !this.isLiked
          // this.likeList = res.data.rows
          if (res.data.rows.find(item => item.id === this.$route.query.id)) {
            this.isLiked = true
          } else {
            this.isLiked = false
          }
        } else if (optType === 2) {
          this.isCollected = !this.isCollected
          if (res.data.rows.find(item => item.id === this.$route.query.id)) {
            this.isCollected = true
          } else {
            this.isCollected = false
          }
        }
      } catch (err) {
        if (err.response) {
          this.$toast(err.response.data.message)
        } else {
          this.$toast('网络异常，请稍后重试')
        }
      }
    },
    // 获取面经详情
    async getArtcleShowAPI() {
      try {
        const { data: res } = await artcleShowAPI(this.$route.query.id)
        this.artcleItem = res.data
        // console.log(this.artcleItem)
      } catch (err) {
        if (err.response) {
          this.$toast(err.response.data.message)
        } else {
          this.$toast('网络异常，请稍后重试')
        }
      }
    },
    // 发送喜欢/收藏接口
    async userArtcleLikes(optType) {
      try {
        await artcleLikesAPI(this.$route.query.id, optType)
        if (optType === 1) {
          this.isLiked = !this.isLiked
        } else if (optType === 2) {
          this.isCollected = !this.isCollected
        }
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
    this.getArtcleShowAPI()
    this.getArtcleLikes(1)
    this.getArtcleLikes(2)
  }
}
</script>

<style lang="less" scoped>
.detail-page {
  margin-top: 44px;
  overflow: hidden;
  padding: 0 15px;
  .header {
    h1 {
      font-size: 24px;
    }
    p {
      color: #999;
      font-size: 12px;
      display: flex;
      align-items: center;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .opt {
    position: fixed;
    bottom: 100px;
    right: 0;
    > .van-icon {
      margin-right: 20px;
      background: #fff;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      box-shadow: 2px 2px 10px #ccc;
      font-size: 18px;
      &.active {
        background: #fec635;
        color: #fff;
      }
    }
  }
}
</style>
