<template>
  <el-form :model="loginform" ref="loginform" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="loginform.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="loginform.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      loginform: {
        username: "",
        password: ""
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { pattern: /^1[3456789]\d{9}$/, message: "手机格式错误请确认", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, message: "密码长度不足请检查", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      this.$refs.loginform.validate(valid => {
        if (valid) {
          this.$axios({
            url: "/accounts/login",
            method: "POST",
            data: this.loginform
          })
            .then(res => {
              console.log(res);
              this.$store.commit('user/setUserInfo',res.data);
                console.log(this.$store.state);
                // this.$router.push('/')
                // 返回上一页
                this.$router.back();
            })
            .catch(err => {
              console.log(res);
            });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.el-form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
