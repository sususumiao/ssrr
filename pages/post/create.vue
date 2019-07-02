<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 左侧内容 -->
      <div class="post-wrapper">
        <div class="post-title">发表新攻略</div>
        <p class="post-hint">分享你的个人游记，让更多人看到哦</p>
        <el-input class="post-input" v-model="articleFrom.title" placeholder="请输入标题"></el-input>
        <!-- 富文本框 -->
        <div
          class="quill-editor"
          v-model="articleFrom.content"
          v-quill:myQuillEditor="editorOption"
        ></div>
        <el-row class="post-city">
          <span>选择城市</span>
          <el-autocomplete
            v-model="articleFrom.city"
            :fetch-suggestions="querySearchAsync"
            placeholder="请搜索游玩城市"
            @select="handleSelect"
          ></el-autocomplete>
        </el-row>
        <el-row class="post-submit">
          <el-button type="primary" @click="handelSubimt">发布</el-button>
          <span>或者</span>
          <em @click="handelSaveDraft">保存到草稿</em>
        </el-row>
      </div>
      <!-- 右侧内容 -->
      <div class="drafts-wrapper">
        <div class="drafts-list">
          <div class="drafts-title">草稿箱({{$store.state.post.draftsList.length}})</div>
          <ul>
            <li v-for="(item,index) in $store.state.post.draftsList" :key="index">
              <span @click="handelEditDraft(index)">
                {{item.title}}
                <i class="el-icon-edit"></i>
              </span>
              <p>{{item.time}}</p>
            </li>
          </ul>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editorOption: {
        //   富文本框图标
        modules: {
          toolbar: [
            [
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "code-block"
            ],

            // 标题 - header*******
            [{ header: 1 }, { header: 2 }],
            // 列表 - list
            [{ list: "ordered" }, { list: "bullet" }],
            // 上标/下标 - script
            [{ script: "sub" }, { script: "super" }],

            // 缩进 - indent
            [{ indent: "-1" }, { indent: "+1" }],

            // 文本方向 - direction
            [{ direction: "rtl" }],
            // 配置文字大小
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            // 配置文字
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            // 配置外部资源
            ["image", "video"]
          ]
        }
      },
      articleFrom: {
        title: "", //标题
        content: "", //文章内容
        city: "" //城市名称
      }
    };
  },
  methods: {
    // 搜索
    querySearchAsync(value, cb) {
      if (!value) {
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        const newData = data.map(v => {
          return {
            ...v,
            value: v.name.replace("市", "")
          };
        });
        if (newData.length > 0) {
          this.articleFrom.city = newData[0].value;
        }
        cb(newData);
      });
    },
    // 选中城市的事件
    handleSelect(item) {
      this.articleFrom.city = item.value;
    },
    // 发布文章
    handelSubimt() {
      this.$axios({
        url: "/posts",
        method: "POST",
        data: this.articleFrom,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        const { status, data } = res;
        if (status === 200) {
          this.$message.success(data.message);
          this.articleFrom = {
            title: "", //标题
            content: "", //文章内容
            city: "" //城市名称
          };
          this.$router.push("/post");
        }
      });
    },
    // 保存到草稿箱
    handelSaveDraft() {
      this.$store.commit("post/setDraftsList", this.articleFrom);
      this.$message.success("保存成功");
    },
    // 编辑草稿
    handelEditDraft(index) {
      const { city, content, title } = this.$store.state.post.draftsList[index];
      this.articleFrom = {
        city,
        content,
        title
      };
    }
  },
  mounted() {}
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
  //   左边样式
  .post-wrapper {
    width: 750px;
    .post-title {
      font-size: 24px;
    }
    .post-hint {
      padding: 10px 0;
      font-size: 12px;
      color: #ccc;
    }
    .post-input {
      margin-bottom: 20px;
    }
    .quill-editor {
      height: 450px;
    }
    .post-city {
      padding: 20px 0;
      span {
        font-size: 14px;
      }
    }
    .post-submit {
      font-size: 14px;
      span {
        display: inline-block;
        padding: 0 10px;
      }
      em {
        color: orange;
        cursor: pointer;
      }
    }
  }
  //   右边样式
  .drafts-wrapper {
    width: 200px;
    .drafts-title {
      margin-bottom: 10px;
    }
    .drafts-list {
      padding: 10px;
      padding-bottom: 20px;
      border: 1px solid #ccc;
      color: #666;
      ul {
        li {
          padding: 5px 0;
          span {
            color: #333;
            font-size: 13px;
            cursor: pointer;
            &:hover {
              color: orange;
              text-decoration: underline;
            }
          }
          p {
            font-size: 14px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>


