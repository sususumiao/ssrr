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
          <div class="menus-right" v-if="menusShow" >
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
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menusList: [],
      currentCities: [],
      menusShow: false,
      menusIndex: ""
    };
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
  .menus-wrapper {
    width: 260px;
    position: relative;
    .menus-top {
      border-top: 1px solid #ccc;
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
      .orge {
        color: orange;
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
      margin-top: 10px;
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
}
</style>


