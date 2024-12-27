<template>
  <div class="layout-page">
    <!-- 首页路由 -->
    <router-view></router-view>
    <!-- 底部标签 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item name="article" icon="home-o" to="/article">列表</van-tabbar-item>
      <van-tabbar-item name="collect" icon="star-o" to="/collect">收藏</van-tabbar-item>
      <van-tabbar-item name="like" icon="like-o" to="/like">喜欢</van-tabbar-item>
      <van-tabbar-item name="user" icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout-page',
  data() {
    return {
      active: 'article'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
