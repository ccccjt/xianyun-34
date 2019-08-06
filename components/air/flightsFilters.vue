<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{flightsList.info.departCity}} - {{flightsList.info.destCity}}
        /
        {{flightsList.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="screenairpost" placeholder="起飞机场" @change="handleAirport">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in flightsList.options.airport"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="screendeptime" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            :label="item.label"
            :value="item.value.to"
            v-for="(item,index) in flightTime"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="screencompany" placeholder="航空公司" @change="handleCompany">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in flightsList.options.company"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="screenairsize" placeholder="机型" @change="handleAirSize">
          <el-option 
          :label="item.label" 
          :value="item.value"
          v-for="(item,index) in airSizeList"
          :key="index"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    flightsList: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      // airport: "", // 机场
      // flightTimes: "", // 出发时间
      // company: "", // 航空公司
      // airSize: "", // 机型大小
      screenairpost:'',
      screendeptime:'',
      screencompany:'',
      screenairsize:'',
      flightTime:[
        {label: "00:00-06:00", value: {
          from:'00',
          to:'06'
        }},
        {label: "06:00-12:00", value: {
          from:'06',
          to:'12'
        }},{label: "12:00-18:00", value: {
          from:'12',
          to:'18'
        }},{label: "18:00-24:00", value: {
          from:'18',
          to:'24'
        }},
        ],
      airSizeList: [
        { label: "大", value: "L" },
        { label: "中", value: "M" },
        { label: "小", value: "S" }
      ]
    };
  },
  watch: {
    "flightsList"(a, b) {
      console.log(a, b);
    }
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      this.screenairpost=value
        this.$emit('screen',this.screenairpost,this.screendeptime,this.screencompany,this.screenairsize)
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
         this.screendeptime=value
         console.log(value);
        this.$emit('screen',this.screenairpost,this.screendeptime,this.screencompany,this.screenairsize)
    },

    // 选择航空公司时候触发
    handleCompany(value) {
       this.screencompany=value
        this.$emit('screen',this.screenairpost,this.screendeptime,this.screencompany,this.screenairsize)
    },

    // 选择机型时候触发
    handleAirSize(value) {
      this.screenairsize=value
      this.$emit('screen',this.screenairpost,this.screendeptime,this.screencompany,this.screenairsize)
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.screenairpost=''
      this.screendeptime=''
      this.screencompany=''
      this.screenairsize=''
      this.$emit('screen',this.screenairpost,this.screendeptime,this.screencompany,this.screenairsize)
    },
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>