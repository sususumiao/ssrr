<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 侧滑栏 -->
      <div class="menus-wrapper">
        <div @mouseleave="handleMenuLeave()">
          <!-- 上面的展开栏 -->
          <div class="menus-top">
            <ul>
              <li
                v-for="(item,index) in menusList"
                :key="index"
                @mouseenter="handleMenuEnter(index)"
                :class="{orge:menusIndex === index,cancel:menusIndex === index}"
              >
                <span>{{item.type}}</span>
                <i class="el-icon-arrow-right menus-top-right"></i>
              </li>
            </ul>
          </div>
          <!-- 展示项 -->
          <div class="menus-right" v-if="menusShow">
            <ul>
              <li v-for="(item,index) in currentCities" :key="index">
                <em>{{index+1}}</em>
                <span>{{item.city}}</span>
                <a href="#">{{item.desc}}</a>
              </li>
            </ul>
          </div>
        </div>

        <!-- 推荐城市模块 -->
        <div class="recommend">
          <div class="recommend-title">推荐城市</div>
          <hr>
          <div class="recommend-img">
            <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt>
          </div>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="post-wrapper">
        <!-- 搜索框 -->
        <el-input placeholder="请输入想去的地方，比如：“广州”" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" type="success"></el-button>
        </el-input>
        <!-- 推荐关键字 -->
        <el-row class="recommend">
          <span>推荐:</span>
          <a href="#" v-for="(item,index) in recommendList" :key="index">{{item.name}}</a>
        </el-row>
        <!-- 推荐攻略 -->
        <div class="strategy">
          <el-row class="strategy-title">
            <span class="orge">推荐攻略</span>
            <el-button type="primary" icon="el-icon-edit" class="strategy-title-button">写游记</el-button>
          </el-row>
          <el-row>
            <PostCard/>
          </el-row>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
import PostCard from "@/components/post/postCard";
export default {
  data() {
    return {
      // 侧边栏菜单内容数据
      menusList: [],
      //   侧边栏子菜单内容数据
      currentCities: [],
      //   推荐搜索的数据
      recommendList: [{ name: "广州" }, { name: "上海" }, { name: "北京" }],
      //   子菜单是否显示
      menusShow: false,
      //   获取子菜单索引
      menusIndex: ""
    };
  },
  components: {
    PostCard
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(result => {
      const { data } = result.data;
      this.menusList = data;
      console.log(data);
    });
  },
  methods: {
    handleMenuLeave() {
      this.menusIndex = "";
      this.menusShow = false;
    },
    handleMenuEnter(index) {
      this.menusIndex = index;
      this.menusShow = true;
      this.currentCities = this.menusList[index].children;
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  min-width: 1000px;
  width: 1000px;
  margin: 20px auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }
  //   左边侧边栏
  .menus-wrapper {
    width: 260px;
    position: relative;
    .menus-top {
      border-top: 1px solid #ccc;

      ul {
        width: 260px;
        position: absolute;
        z-index: 3;
      }
      li {
        //   width: 100%;
        padding: 0 20px;
        height: 41px;
        line-height: 41px;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        font-size: 14px;
        .menus-top-right {
          float: right;
          margin-top: 12px;
        }
      }

      .cancel {
        border-right: 0px;
      }
    }

    //   展开的样式
    .menus-right {
      position: absolute;
      left: 259px;
      top: 0px;
      width: 320px;
      border: 1px solid #ccc;
      border-left: 0px;
      z-index: 2;
      background: #fff;
      li {
        padding: 0 10px;
        height: 41px;
        line-height: 41px;
        color: orange;
        font-size: 14px;
        &:last-child {
          border-left: 1px solid #ccc;
        }
        em {
          font-size: 18px;
        }
        span {
          margin: 0 8px;
        }
        a {
          color: #999;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    //   推荐城市样式
    .recommend {
      margin-top: 180px;

      .recommend-title {
        margin-bottom: 10px;
      }
      hr {
        // background: #ccc;
        border: 1px solid #ccc;
        border-bottom: 0px;
      }
      .recommend-img {
        margin-top: 10px;
        width: 260px;
        img {
          width: 260px;
        }
      }
    }
  }
  .orge {
    color: orange;
  }
  //   内容右侧
  .post-wrapper {
    width: 700px;
    .search {
      border: 2px solid orange;
    }
    .recommend {
      font-size: 12px;
      color: #666;
      margin-top: 5px;
      a {
        display: inline-block;
        margin: 0 10px;
      }
    }
    .strategy {
      .strategy-title {
        padding: 10px 0;
        // margin-top: 10px;
        line-height: 40px;
        border-bottom: 1px solid #ccc;
        span {
          border-bottom: 3px solid orange;
          padding-bottom: 17px;
        }
        .strategy-title-button {
          float: right;
        }
      }
    }
  }
}
</style>


