<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 左侧内容 -->
      <div class="post-wrapper">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/post">旅游攻略</el-breadcrumb-item>
          <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>{{articleDetails.title}}</h1>
        <hr class="hr" />
        <div
          class="post-issue"
        >攻略:{{articleDetails.created_at}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;阅读：{{articleDetails.watch}}</div>
        <div class="post-content">
          <div v-html="articleDetails.content"></div>
        </div>
        <!-- 点赞，收藏功能 -->
        <el-row class="post-function" justify="center" type="flex">
          <ul>
            <li>
              <i class="iconfont iconpinglun"></i>
              <p>评价(13)</p>
            </li>
            <li>
              <i class="iconfont iconstar1"></i>
              <p>收藏</p>
            </li>
            <li>
              <i class="iconfont iconfenxiang"></i>
              <p>分享</p>
            </li>
            <li>
              <i class="iconfont iconding"></i>
              <p>点赞(1)</p>
            </li>
          </ul>
        </el-row>
        <!-- 评论功能结构 -->
        <div class="post-comment">
          <div class="comment-title">评论</div>
          <el-input type="textarea" 
          :rows="4" 
          placeholder="请输入内容" 
          v-model="textarea"
          :autosize="{minRows: 2, maxRows: 6}"></el-input>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="correlation-wrapper">
        <div class="correlation-title">相关攻略</div>
        <nuxt-link
          to="/"
          v-for="(item,index) in strategyList"
          :key="index"
          class="correlation-content"
        >
          <el-row type="flex" justify="space-between">
            <div class="correlation-left">
              <img :src="item.images[0]" alt />
            </div>
            <div class="correlation-right">
              <span>{{item.title}}</span>
              <p>{{item.city.created_at}}阅读:{{item.watch}}</p>
            </div>
          </el-row>
        </nuxt-link>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 文章详情数据
      articleDetails: {},
      //   攻略列表
      strategyList: [
        {
          title: "",
          images: [""],
          city: {
            created_at: ""
          },
          watch: ""
        }
      ],
    //   评论的数据
    textarea:""
    };
  },
  mounted() {
    //   获取文章详情
    const { id } = this.$route.query;
    this.$axios({
      url: "/posts",
      params: {
        id: id
      }
    }).then(res => {
      const { data } = res.data;
      this.articleDetails = data[0];
    });
    // 获取相关攻略
    this.$axios({
      url: "/posts"
    }).then(res => {
      const { data } = res.data;
      this.strategyList = data;
    });
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
  //   左侧样式
  .post-wrapper {
    width: 700px;
    h1 {
      margin-top: 20px;
    }
    .hr {
      margin: 20px 0;
      border: 1px solid #ccc;
    }
    .post-issue {
      padding: 10px;
      text-align: right;
      color: #aaa;
    }
    .post-content {
      line-height: 1.5;
      /deep/ * {
        max-width: 700px !important;
      }
      /deep/ p {
        line-height: 1.5em;
      }
      /deep/img {
        padding: 10px 0;
      }
    }
    .post-function {
      ul {
        li {
          float: left;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          i {
            display: inline-block;
            padding-bottom: 10px;
            font-size: 28px;
            color: orange;
          }
          p {
            font-size: 14px;
            color: #999;
          }
        }
      }
    }
  }
  // 右侧样式
  .correlation-wrapper {
    width: 280px;
    .correlation-title {
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }
    .correlation-content {
      display: block;
      padding: 15px 0;
      border-bottom: 1px solid #ccc;

      .correlation-left {
        img {
          width: 100px;
          height: 80px;
        }
      }
      .correlation-right {
        width: 170px;
        height: 80px;
        span {
          display: block;
          font-size: 16px;
          overflow: hidden;
          height: 34px;
          color: #333;
          padding-bottom: 30px;
        }
        p {
          font-size: 10px;
          color: #999;
        }
      }
    }
  }
}
</style>


