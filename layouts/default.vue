<template>
  <div>
    <!-- 头部组件 -->
    <Header></Header>
    <!-- 内容占位组件 -->
    <nuxt></nuxt>
    <!-- 脚部组件 -->
    <Footer></Footer>
  </div>
</template>

<script>
// 导入头部组件
import Header from "@/components/header"
import Footer from "@/components/footer"
export default {
  // 注册组件
  components: {
    Header,
    Footer
  }
}
</script>
<style lang="less">
//  全局样式
*{
  margin: 0;
  padding: 0;
}
ul,li,ol{
  list-style: none;
  padding: 0px;
  margin: 0px;
}
a{
  color: #666;
  text-decoration: none;
}
em,i{
  font-style: normal
}
</style>    