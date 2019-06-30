<template>
  <div>
    <div v-for="(item,index) in $store.state.post.articleList" :key="index">
      <div class="layout1" v-if="item.images.length>1">
        <nuxt-link class="layout1Title" :title="item.title" :to="'/post/detail?id='+item.id">{{item.title}}</nuxt-link>
        <nuxt-link :to="'/post/detail?id='+item.id"><p v-html="item.summary"></p></nuxt-link>
        <el-row class="layout1Img">
          <nuxt-link :to="'/post/detail?id='+item.id" v-for="(item2,index) in item.images" :key="index">
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
            <nuxt-link :to="'/post/detail?id='+item.id" v-for="(item3,index) in item.images" :key="index">
              <img :src="item3">
            </nuxt-link>
          </div>
          <div class="layout2Right">
            <nuxt-link class="layout2Title" :title="item.title" :to="'/post/detail?id='+item.id">{{item.title}}</nuxt-link>
            <nuxt-link :to="'/post/detail?id='+item.id"><p v-html="item.summary"></p></nuxt-link> 
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
        :total="$store.state.post.list.total"
      ></el-pagination>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 文章总数据
      articleList: [],
      // 分页器数据
      list: {
        currentPage: 0,
        total: 0,
        pageSize: 3
      }
    };
  },
  methods: {
    // 获取文章数据
    getList() {
      this.$store.dispatch('post/getList')
    },
    // 切换页面数据数量
    handleSizeChange(val) {
      this.$store.commit('post/handleSizeChange',val)
      this.$store.dispatch('post/getList')
    },
    // 切换页面方法
    handleCurrentChange(val) {
      this.$store.commit('post/handleCurrentChange',val)
      this.$store.dispatch('post/getList')
    },
    // 跳转页面
    handlePush(id){
      this.$router.push('/post/detail?id='+id)
    }
  },
  mounted() {
     this.$store.dispatch('post/getList')
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
    cursor: pointer;
    &:hover {
      color: orange;
    }
  }
  p {
    font-size: 14px;
    height: 57px;
    overflow: hidden;
    cursor: pointer;
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
      cursor: pointer;
      &:hover {
        color: orange;
      }
    }
    p {
      font-size: 14px;
      height: 57px;
      overflow: hidden;
      cursor: pointer;
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
