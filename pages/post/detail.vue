<template>
  <div class="container">
    <!-- 左侧内容 -->
    <div class="post-wrapper">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">攻略详情</a></el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <!-- 右侧内容 -->
    <div class="correlation-wrapper"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
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
  }
  // 右侧样式
  .correlation-wrapper {
    width: 260px;
  }
}
</style>


