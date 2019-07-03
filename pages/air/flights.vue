<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList" />

        <!-- 航班头部布局 -->
        <FightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
        <!-- 分页器 -->
        <el-row type="flex" justify="center">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-row>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FightsListHead from "@/components/air/fightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";

export default {
  data() {
    return {
      flightsData: {
        info: {},
        options: {}
      },
      // 缓存对象，缓存对象一旦赋值之后不会被修改
      cacheFlightsData: {
        info: {},
        options: {}
      },
      dataList: {},
      total: 0,
      pageSize: 5,
      pageIndex: 1
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.setDataList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.setDataList();
    },
    //   设置机票页数据
    setDataList(arr) {
      if (arr) {
        this.flightsData.flights = arr;
        // 初始化页面数据
        this.pageIndex = 1;
        this.total = arr.length;
      }
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageSize * this.pageIndex
      );
    },
    // 获取数据
    getDate() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        this.flightsData = res.data;
        this.dataList = this.flightsData.flights.slice(0, 5);
        this.total = res.data.total;
        this.cacheFlightsData = { ...res.data };
        // console.log(this.dataList);
      });
    }
  },
  components: {
    FightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  watch:{
    $route(){
        this.getDate()
    }
  },
  mounted() {
    this.getDate();
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