<template>
  <div class="login-page">
    <!-- 标题 -->
    <van-nav-bar title="面经登录" />
    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field v-model="username" name="username" label="用户名" placeholder="用户名" :rules="userRules" />
      <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" :rules="passwordRules" />
      <div style="margin: 16px;">
        <van-button color="#FA6C1C" square block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!-- 跳转到注册 -->
    <div style="display: flex; justify-content:end; padding: 0 20px; ">
      <router-link to="/register">注册账号</router-link>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api/user'

export default {
  name: 'login-page',
  data() {
    return {
      username: '',
      password: '',
      userRules: [
        { required: true, message: '请填写用户名' },
        { pattern: /^\w{2,10}$/, message: '请输入 2-10位用户名' }
      ],
      passwordRules: [
        { required: true, message: '请填写密码' },
        { pattern: /^\S{6,20}$/, message: '请输入 6-20位的密码' }
      ]
    }
  },
  methods: {
    async onSubmit(values) {
      // 发送登录请求
      try {
        const { data: res } = await loginAPI(values)
        // 登录成功, 储存token到本地 ,清空数据，跳转到首页
        this.$toast('登录成功.')
        localStorage.setItem('mobile-token', res.data.token)
        this.username = this.password = ''
        // console.log(res)
        this.$router.push('/article')
      } catch (err) {
        // console.log(err)
        // 判断有没有返回错误消息
        if (err.response) {
          this.$toast(err.response.data.message)
        } else {
          this.$toast('网络异常，请稍后重试')
        }
      }
      // console.log('submit', values)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
