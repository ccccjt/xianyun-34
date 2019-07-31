<template>
  <div>
    <div class="block">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="(item,index) in banners" :key="index">
          <div
            :style="`background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;
      background-size:contain contain;`"
            class="banner-image"
          ></div>
        </el-carousel-item>
      </el-carousel>
      <div class="search">
        <el-button
          class="btn-opacity"
          v-for="(item,index) in options"
          :key="index"
          :class="{active:current===index}"
          @click="handleOption(index)"
        >{{item.name}}</el-button>
        <el-input :placeholder="options[current].placeholder" v-model="searchval">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      banners: [],
      searchval: "",
      options: [
        // 搜索框tab选项
        {
          name: "攻略",
          placeholder: "搜索城市",
          pageUrl: "/post?city="
        },
        {
          name: "酒店",
          placeholder: "请输入城市搜索酒店",
          pageUrl: "/hotel?city="
        },
        {
          name: "机票",
          placeholder: "请输入出发地",
          pageUrl: "/air"
        }
      ]
    };
  },
  methods: {
    handleOption(index) {
      this.current = index;
      if(this.options[index].name==='机票'){
        this.$router.push(this.options[index].pageUrl)
      }
    },
    handleSearch() {
      let res=this.options[this.current].pageUrl+this.searchval
      console.log(res);
      this.$router.push(res)
    }
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      console.log(res);
      this.banners = res.data.data;
    }).catch(err=>{console.log(err);})
      console.log(this.$axios.defaults);
  }
};
</script>

<style scoped lang='less'>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.block {
  min-width: 1000px;
  margin: 0 auto;
}
/deep/ .el-carousel__container {
  height: 700px;
}
.banner-image {
  width: 100%;
  height: 100%;
}

.el-input {
  width: 550px;
}
.btn-opacity{
  opacity:.5;
}
.search {
  position: absolute;
  width: 552px;
  margin: 0 auto;
  left: 360px;
  top: 250px;
  opacity:1;
  z-index: 9;
}
.active {
  background-color: #fff;
  opacity:1;
}
</style>
