<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <FlightsFilters :flightsList="flightsListData" @screen="screen" />
        </div>

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead />
        </div>

        <!-- 航班信息 -->
        <div>
          <FlightsItem v-for="(item,index) in currentFlightsList" :key="index" :data="item" />
        </div>
        <el-row type="flex" justify="center" style="margin-top:10px;">
          <!-- size-change：切换条数时候触发 -->
          <!-- current-change：选择页数时候触发 -->
          <!-- current-page: 当前页数 -->
          <!-- page-size：当前条数 -->
          <!-- total：总条数 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-row>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <FlightsAside/>
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside";

export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside

  },
  data() {
    return {
      flightsList: [],
      flightsListData:{
        info:{},
        options:{}
      },
      currentFlightsList: [],
      total: 0,
      pagenum: 1,
      pagesize: 5
    };
  },
  methods: {
    init(arr) {
      if(arr){
       this.flightsList=arr
       this.pagenum=1
      }
      this.currentFlightsList = this.flightsList.slice(
        (this.pagenum - 1) * this.pagesize,
        this.pagenum * this.pagesize
      );
    },
    screen(screenairpost,screendeptime,screencompany,screenairsize){
      // this.currentFlightsList
      // console.log(screenairpost);
      // console.log(screendeptime);
      // console.log(screencompany);
      // console.log(screenairsize);
      var arr=[...this.flightsListData.flights]
      if(screenairpost){
        arr=arr.filter(v=>{
        return v.org_airport_name==screenairpost  
      })
      }
      if(screendeptime){
        arr=arr.filter(v=>{
        return (screendeptime-6)<=(v.dep_time[0]+v.dep_time[1]) && (v.dep_time[0]+v.dep_time[1])<screendeptime 
      })
      }
      if(screencompany){
        arr=arr.filter(v=>{
        return v.airline_name==screencompany  
      })
      }
      if(screenairsize){
        arr=arr.filter(v=>{
        return v.plane_size==screenairsize 
      })
      }
      // console.log(arr);
      this.total=arr.length
      this.init(arr)
    },
    handleSizeChange(val) {
      //   console.log("SizeChange" + val);
      this.pagesize = val;
      //   console.log(this.pagesize);
      this.init();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
    //   console.log("CurrentChange" + val);
      this.init();
    }
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      // console.log(res);
      this.flightsList = [...res.data.flights];
      this.flightsListData={...res.data}
      this.total = this.flightsList.length;
      this.init();
    });
  },
  watch: {
    $route(){
      this.$axios({
        url: "/airs",
      params: this.$route.query
    }).then(res => {
      console.log(res);
      this.flightsList = [...res.data.flights];
      this.flightsListData={...res.data}
      this.total = this.flightsList.length;
      this.init();
    });
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>