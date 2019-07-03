<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <OrderForm @setTicketList="setTicketList" @setAllPrice="setAllPrice"/>

      <!-- 侧边栏 -->
      <div class="aside">
        <OrderAside  :data="getTicketList" :all="allPrice"/>
      </div>
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue";
import OrderAside from "@/components/air/orderAside.vue";
export default {
  data() {
    return {
      getTicketList:{
        seat_infos:{}
      },
      allPrice:0
    };
  },
  methods: {
    setTicketList(data){
      this.getTicketList = data
    },
    setAllPrice(data){
      this.allPrice = data
    }
  },
  components: {
    OrderForm,
    OrderAside
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>