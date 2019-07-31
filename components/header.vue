<template>
  <header class="header">
    <el-row type="flex" justify="space-between" class="w">
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <el-row type="flex" class="nav" align="middle">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <div v-if="$store.state.user.userInfo.token">
        <el-dropdown>
          <el-row type="flex" align="middle" class="el-dropdown-link">
            <nuxt-link to="#">
              <img
                :src="`${$axios.defaults.baseURL+$store.state.user.userInfo.user.defaultAvatar}`"
              />
              {{$store.state.user.userInfo.user.nickname}}
            </nuxt-link>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-row>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <nuxt-link to="#">个人中心</nuxt-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="handleLogout">退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-else>
        <nuxt-link to="/user/login" class="account-link">登录/注册</nuxt-link>
      </div>
    </el-row>
  </header>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleLogout() {
      this.$router.push("user/login");
      this.$store.commit("user/clearUserInfo");
    }
  },
  mounted() {
   
  }
};
</script>
<style lang='less' scoped>
.w {
  margin: 0 auto;
  width: 1000px;
}
.header {
  height: 60px;
  line-height: 60px;
  box-sizing: border-box;
  border-bottom: 1px #ddd solid;
  background: #fff;
  .logo {
    width: 156px;
    padding-top: 8px;

    img {
      display: block;
      width: 100%;
    }
  }
  .nav {
    flex: 1;
    margin: 0 20px;
    a {
      display: block;
      padding: 0 20px;
      box-sizing: border-box;
      height: 60px;
      line-height: 60px;

      &:hover {
        color: #00a4ff;
        border-bottom: 5px #00a4ff solid;
      }
    }
    .nuxt-link-exact-active {
      color: #fff !important;
      background-color: #00a4ff;
    }
  }
  .user {
    a {
      &:hover {
        color: #00a4ff;
      }
    }
  }
}
.el-dropdown-link {
  margin-left: 20px;

  &:hover {
    img {
      border-color: #409eff;
    }
  }

  a {
    display: block;
  }

  img {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    border: 2px #fff solid;
    border-radius: 50px;
  }
}
.account-link {
  font-size: 14px;
  margin-left: 10px;
  color: #666;

  &:hover {
    color: #409eff;
    text-decoration: underline;
  }
}
</style>