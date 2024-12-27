<template>
  <van-cell class="article-item" :to="link">
    <template #title>
      <div class="head">
        <img :src="artcle.avatar" alt />
        <div class="con">
          <p class="title van-ellipsis">{{ artcle.stem }}</p>
          <p class="other">{{ artcle.creator }} | {{ artcle.createdAt }}</p>
        </div>
      </div>
    </template>
    <template #label>
      <div class="body van-multi-ellipsis--l2">{{ delHtmlTag(artcle.content) }}</div>
      <div class="foot">点赞 {{ artcle.likeCount }} | 浏览 {{ artcle.views }}</div>
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'CellVue',
  props: {
    artcle: {
      type: Object,
      required: true,
      default: () => ({})
    },
    link: {
      type: String,
      required: true
    }
  },
  methods: {
    delHtmlTag(html) {
      return html.replace(/<[^>]+>/g, '')
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .head {
    display: flex;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    .con {
      flex: 1;
      overflow: hidden;
      padding-left: 10px;
      p {
        margin: 0;
        line-height: 1.5;
        &.title {
          width: 280px;
        }
        &.other {
          font-size: 10px;
          color: #999;
        }
      }
    }
  }
  .body {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-top: 10px;
  }
  .foot {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
}
</style>
