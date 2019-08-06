<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <OrderForm :data="airInfo"/>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                          
            </div>
        </el-row>
    </div>
</template>
<script>
import OrderForm from "@/components/air/orderForm";
export default {
    components: {
        OrderForm,
    },
    data () {
        return {
            airInfo:{

            }
        }
    },
    methods: {
        
    },
    mounted () {
        console.log(this.$route.query); 
        this.$axios({
            url:'airs/'+this.$route.query.id,
            params:{seat_xid:this.$route.seat_xid}
        }).then(res=>{
            this.airInfo=res.data
            console.log(res);
        })
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>