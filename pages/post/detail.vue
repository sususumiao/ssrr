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
            <li @click="handleAddCollect">
              <i class="iconfont iconstar1"></i>
              <p>收藏</p>
            </li>
            <li>
              <i class="iconfont iconfenxiang"></i>
              <p>分享</p>
            </li>
            <li @click="handleAddPraise">
              <i class="iconfont iconding"></i>
              <p>
                点赞
                <span v-if="articleDetails.like !== null">({{articleDetails.like}})</span>
              </p>
            </li>
          </ul>
        </el-row>
        <!-- 评论功能结构 -->
        <div class="post-comment">
          <div class="comment-title">评论</div>
          <el-input
            type="textarea"
            style="resize:none;"
            :rows="4"
            placeholder="请输入内容"
            v-model="cmtForm.content"
            :autosize="{minRows: 2, maxRows: 6}"
          ></el-input>
          <el-row type="flex" justify="space-between" class="comment-mian">
            <!-- 上传图片 -->
            <el-upload
              :action="$axios.defaults.baseURL + `/upload`"
              list-type="picture-card"
              :file-list="cmtForm.pics"
              name="files"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
            <!-- 按钮 -->
            <el-button type="primary" class="button" @click="handelCommentSubmit">提交</el-button>
          </el-row>
        </div>
        <!-- 评论列表 -->
        <div class="post-list">
          <div v-for="(item,index) in commentList" :key="index">
            <!-- 一楼模块 -->
            <div class="list-one" v-if="!item.parent">
              <el-row>
                <el-avatar :src="$axios.defaults.baseURL + item.account.defaultAvatar"></el-avatar>
                <span>{{item.account.nickname}}</span>
                <em>2019-07-01 4:38</em>
                <i>{{item.level}}</i>
              </el-row>
              <div class="list-content-one">
                <p>{{item.content}}</p>
                <img
                  v-for="(item2,index) in item.pics"
                  :key="index"
                  :src="$axios.defaults.baseURL + item2.url"
                />
              </div>
            </div>
            <!-- 二楼模块 -->
            <div class="list-tow" v-else>
              <el-row>
                <el-avatar :src="$axios.defaults.baseURL + item.account.defaultAvatar"></el-avatar>
                <span>{{item.account.nickname}}</span>
                <em>2019-07-01 4:38</em>
                <i>{{item.level}}</i>
              </el-row>
              <div class="list-tow-record">
                <el-row>
                  <span>{{item.parent.account.nickname}}</span>
                  <em>2019-07-01 4:38</em>
                  <i>{{item.parent.level}}</i>
                </el-row>
                <div class="list-tow-record-content">
                  <p>{{item.parent.content}}</p>
                  <img
                    v-for="(item3,index) in item.parent.pics"
                    :key="index"
                    :src="$axios.defaults.baseURL + item3.url"
                  />
                </div>
              </div>
              <div class="list-content-two">
                <p>{{item.content}}</p>
                <img
                  v-for="(item2,index) in item.pics"
                  :key="index"
                  :src="$axios.defaults.baseURL + item2.url"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <el-row type="flex" justify="space-between">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-row>
      </div>
      <!-- 右侧内容 -->
      <div class="correlation-wrapper">
        <div class="correlation-title">相关攻略</div>
        <span
          v-for="(item,index) in strategyList"
          :key="index"
          @click="handelPushPosts(item.id)"
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
        </span>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      cmtForm: {
        content: "",
        pics: []
      },
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
      // 获取评论
      commentList: [],
      //   评论的数据
      textarea: "",
      // 分页器
      pageIndex:1,
      pageSize:2,
      total:0,
    };
  },
  methods: {
    // 相关攻略事件
    handelPushPosts(id) {
      this.$router.push(`/post/detail?id=${id}`);
      this.getPosts();
    },
    // 收藏的事件
    handleAddCollect() {
      const { id } = this.$route.query;
      this.$axios({
        url: "/posts/star",
        params: {
          id
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        if (res.status === 200) {
          this.$message.success(res.data.message);
        }
      });
    },
    // 点赞的事件
    handleAddPraise() {
      const { id } = this.$route.query;
      this.$axios({
        url: "/posts/like",
        params: {
          id
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        if (res.status === 200) {
          this.articleDetails.like++;
          this.$message.success(res.data.message);
        }
      });
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    // 已上传的文件
    handlePictureCardPreview(file) {
      if (file.response) {
        file = file.response[0];
      }
      // console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(file, fileList) {
      file[0].url = this.$axios.defaults.baseURL + file[0].url;
      this.cmtForm.pics.push(file[0]);
    },
    // 提交评论事件
    handelCommentSubmit() {
      const { id } = this.$route.query;
      this.$axios({
        url: "/comments",
        method: "POST",
        data: {
          ...this.cmtForm,
          post: id
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        const { data, status } = res;
        if (status === 200) {
          this.$message.success(data.message);
          this.cmtForm = {
            content: "",
            pics: []
          };
        }
      });
    },
    // 切换页面事件
    handleCurrentChange(val) {
      this.pageIndex = val
      this.getPostsComment()
    },
    // 切换页面数据条数事件
    handleSizeChange(val) {
      this.pageSize = val
      this.getPostsComment()
    },
    //   获取文章详情
    getPosts() {
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
    },
    // 获取文章评论
    getPostsComment(){
       const { id } = this.$route.query;
    this.$axios({
      url: "/posts/comments",
      params: {
        post: id,
        _limit: this.pageSize,
        _start: this.pageIndex -1
      }
    }).then(res => {
      const { data } = res.data;
      this.commentList = data;
      this.total = res.data.total
    });
    }
  },
  mounted() {
    //   获取文章详情
    this.getPosts();
    // 获取相关攻略
    this.$axios({
      url: "/posts"
    }).then(res => {
      const { data } = res.data;
      this.strategyList = data;
    });
    // 获取相关的评论
   this.getPostsComment();
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
    .post-comment {
      .comment-mian {
        margin-top: 20px;
        .button {
          height: 40px;
        }
      }
    }
    .post-list {
      margin-top: 20px;
      border: 1px solid #aaa;
      > div {
        .list-one {
          padding: 20px;
          border-bottom: 1px dashed #ccc;
          span {
            font-size: 14px;
            color: #333;
          }
          em {
            font-size: 12px;
            color: #666;
          }
          i {
            float: right;
            font-size: 14px;
            color: #333;
          }
          .list-content-one {
            padding: 10px 10px 5px 40px;
            p {
              padding: 10px 0;
            }
            img {
              width: 80px;
              height: 80px;
              padding: 3px;
              border: 1px dashed #ccc;
              border-radius: 8px;
            }
          }
        }
        .list-tow {
          padding: 20px;
          border-bottom: 1px dashed #ccc;
          span {
            font-size: 14px;
            color: #333;
          }
          em {
            font-size: 12px;
            color: #666;
          }
          i {
            float: right;
            font-size: 14px;
            color: #333;
          }
          .list-tow-record {
            margin-top: 10px;
            margin-left: 30px;
            padding: 10px;
            border: 1px solid #ccc;
            background: rgb(249, 249, 249);
            .list-tow-record-content {
              p {
                padding: 10px 0;
              }
              img {
                width: 80px;
                height: 80px;
                padding: 3px;
                border: 1px dashed #ccc;
                border-radius: 8px;
              }
            }
          }
          .list-content-two {
            padding: 10px 10px 5px 40px;
            p {
              padding: 10px 0;
            }
            img {
              width: 80px;
              height: 80px;
              padding: 3px;
              border: 1px dashed #ccc;
              border-radius: 8px;
            }
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
      cursor: pointer;
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


