<template>
  <div>
    <div v-for="(item,index) in articleList" :key="index">
      <div class="layout1" v-if="item.images.length>1">
        <span class="layout1Title">{{item.title}}</span>
        <p v-html="item.summary"></p>
        <el-row class="layout1Img">
          <nuxt-link to="/" v-for="(item2,index) in item.images" :key="index">
            <img :src="item2">
          </nuxt-link>
        </el-row>
        <el-row class="layout1Bottom">
          <i class="el-icon-location-outline"></i>
          <span>{{item.cityName}}&nbsp;&nbsp;&nbsp;by</span>
          <nuxt-link to="/">
            <img :src="$axios.defaults.baseURL + item.account.defaultAvatar" alt>
            <i>{{item.account.nickname}}</i>
          </nuxt-link>
          <i class="el-icon-view"></i>
          <span>{{item.watch || 0}}</span>
          <em class="layout1Praise">{{item.like ||0}}赞</em>
        </el-row>
      </div>
      <div class="layout2" v-else>
        <el-row>
          <div class="layout2Left">
            <nuxt-link to="/" v-for="(item3,index) in item.images" :key="index">
              <img :src="item3">
            </nuxt-link>
          </div>
          <div class="layout2Right">
            <span class="layout2Title">{{item.title}}</span>
            <p v-html="item.summary"></p>
            <el-row class="layout2Bottom">
              <i class="el-icon-location-outline"></i>
              <span>{{item.cityName}}&nbsp;&nbsp;&nbsp;by</span>
              <nuxt-link to="/">
                <img :src="$axios.defaults.baseURL + item.account.defaultAvatar" alt>
                <i>{{item.account.nickname}}</i>
              </nuxt-link>
              <i class="el-icon-view"></i>
              <span>{{item.watch || 0}}</span>
              <em class="layout2Praise">{{item.like ||0}}赞</em>
            </el-row>
          </div>
        </el-row>
      </div>
    </div>
    <!-- 分页器区域功能 -->
    <el-row type="flex" justify="center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="list.currentPage +1"
        :page-sizes="[3, 6, 9, 12]"
        :page-size="list.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.total"
      ></el-pagination>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      articleList: [],
      showType: "imageText",
      list: {
        currentPage: 0,
        total: 0,
        pageSize: 3
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(val)
      this.list.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.list.currentPage = this.list.pageSize*(val-1)
      this.getList()
    },
    getList(){
      const params = {
      _start:this.list.currentPage,
      _limit:this.list.pageSize
    }
      this.$axios({
      url: "/posts",
      params
    }).then(result => {
      const { data } = result.data;
      this.articleList = data;
      this.list.total = result.data.total;
    });
    }
  },
  mounted() {
    
    this.getList()
  }
};
</script>

<style lang="less" scoped>
.layout1 {
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  .layout1Title {
    display: block;
    padding: 10px 0;
    font-size: 16px;
    color: #333;
  }
  p {
    font-size: 14px;
    height: 57px;
    overflow: hidden;
  }
  .layout1Img {
    height: 150px;
    margin: 10px 0;
    width: 700px;
    overflow: hidden;
    a {
      width: 220px;
      margin-right: 20px;
      img {
        width: 220px;
        height: 150px;
      }
      &:last-child {
        margin: 0;
      }
    }
  }
  .layout1Bottom {
    font-size: 12px;
    color: #999;
    a {
      img {
        width: 16px;
        height: 16px;
        vertical-align: middle;
        padding: 3px;
      }
      i {
        display: inline-block;
        color: orange;
      }
    }
  }
  .layout1Praise {
    float: right;
    color: orange;
    font-size: 16px;
  }
}
.layout2 {
  height: 150px;
  padding: 25px 0;
  border-bottom: 1px solid #ccc;
  .layout2Left {
    float: left;
    width: 220px;
    img {
      width: 220px;
      height: 150px;
    }
  }
  .layout2Right {
    float: right;
    width: 470px;
    .layout2Title {
      display: block;
      padding: 10px 0;
      font-size: 16px;
      color: #333;
    }
    p {
      font-size: 14px;
      height: 57px;
      overflow: hidden;
    }
    .layout2Bottom {
      font-size: 12px;
      color: #999;
      margin-top: 20px;
      a {
        img {
          width: 16px;
          height: 16px;
          vertical-align: middle;
          padding: 3px;
        }
        i {
          display: inline-block;
          color: orange;
        }
      }
    }
    .layout2Praise {
      float: right;
      color: orange;
      font-size: 16px;
    }
  }
}
</style>
