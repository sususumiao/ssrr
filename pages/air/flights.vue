<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <FlightsFilters :data="flightsData.options"/>
                
                <!-- 航班头部布局 -->
                <FightsListHead/>
                
                
                <!-- 航班信息 -->
                <FlightsItem 
                v-for="(item,index) in dataList"
                :key="index"
                :data="item"/>
                <!-- 分页器 -->
                <el-row type="flex" justify="center">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                 </el-pagination>
                </el-row>
                
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
                <FlightsAside/>
            </div>
        </el-row>
    </section>
</template>

<script>

import FightsListHead from "@/components/air/fightsListHead"
import FlightsItem from "@/components/air/flightsItem"
import FlightsFilters from "@/components/air/flightsFilters.vue"
import FlightsAside from "@/components/air/flightsAside.vue"

export default {
    data(){
        return {
            flightsData:{
                info: {},
                options: {}
            },
            dataList:{},
            cacheFlightsData:{},
            total:0,
            pageSize:5,
            pageIndex:1
        }
    },
    methods:{
         handleSizeChange(val) {
             this.pageSize = val
             this.setDataList()
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
          this.pageIndex = val
          this.setDataList()
        // console.log(`当前页: ${val}`);
      },
    //   设置机票页数据
    setDataList(){
        this.dataList = this.flightsData.flights.slice(
        (this.pageIndex-1)*this.pageSize,
        this.pageSize*this.pageIndex)
        console.log(this.dataList)
    }
    },
    components:{
        FightsListHead,
        FlightsItem,
        FlightsFilters,
        FlightsAside
    },
    mounted () {
        this.$axios({
            url:'/airs',
            params:this.$route.query
        }).then(res=>{
            this.flightsData = res.data
            this.dataList = this.flightsData.flights.slice(0,5)
            this.total = res.data.total
            this.cacheFlightsData = {...res.data}
            console.log(this.dataList)
        })
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>