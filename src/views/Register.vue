<template>
  <div class="login-page">
    <!-- 标题 -->
    <van-nav-bar title="面经注册" />
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field v-model="username" name="username" label="用户名" placeholder="用户名" :rules="userRules" />
      <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" :rules="passwordRules" />
      <div style="margin: 16px;">
        <van-button color="#FA6C1C" square block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <!-- 跳转到登录  -->
    <div style="display: flex; justify-content:end; padding: 0 20px;">
      <router-link to="/login">登录账号</router-link>
    </div>
  </div>
</template>

<script>
import { registerAPI } from '@/api/user'
export default {
  name: 'register-page',
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
      try {
        // 发送注册请求
        await registerAPI(values)
        this.$toast.success('注册成功')
        // 注册成功清除表单
        this.username = ''
        this.password = ''
        // 跳转到登录
        this.$router.push('/login')
      } catch (err) {
        // 请求失败处理
        // 判断是否返回错误问题
        if (err.response) {
          this.$toast.fail(err.response.data.message)
        } else {
          this.$toast.fail('网络错误，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
