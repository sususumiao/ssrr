<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="form.departCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="form.destCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          v-model="form.departDate"
          @change="handleDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      form: {
        departCity: "", //出发城市
        destCity: "", //目的城市
        departDate: "", //日期
        departCode: "", //出发城市代码
        destCode: "" //目标城市代码
      }
    };
  },
  methods: {
    
    /** 
     * 加载查询机票时城市列表
     * @param {String} value 输入的值 ,city 城市名称 , code 城市编码 cb 回调函数
     * @return {Array}
      */

    // 封装请求城市方法
    async getList(value,city,code, cb) {
      // 输入框为空时不触发此事件
      if (!value) {
        return
      }
      const res = await this.$axios({
        url: "http://157.122.54.189:9095/airs/city",
        params: {
          name: value
        }
      })
      const { data } = res.data;
      const newData = data.map(v => {
        return {
          ...v,
          value: v.name.replace("市", "")
        }
      })
      if(newData.length >0){
        this.form.city = newData[0].value
        this.form.code = newData[0].sort
      }
      cb(newData)
    },

    // tab切换时触发
    handleSearchTab(item, index) {},

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      // 输入框为空时不触发此事件
      this.getList(value,this.form.departCity,this.form.departCode,cb)
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value,cb) {
     this.getList(value,this.form.destCity,this.form.destCode ,cb)
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
      // console.log(item)
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
      // console.log(item)
    },

    // 确认选择日期时触发
    handleDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
      //   console.log(value);
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      const { departCity, destCity } = this.form;
      this.form.departCity = destCity;
      this.form.destCity = departCity;
    },

    // 提交表单是触发
    handleSubmit() {
      // 自定义表单验证
      const rules = {
        depart: {
          value: this.form.departCity,
          message: "请选择出发城市"
        },
        dest: {
          value: this.form.destCity,
          message: "请选择目的城市"
        },
        departDate: {
          value: this.form.departDate,
          message: "请选择出发时间"
        }
      };
      // 验证变量，默认通过
      let valid = true;
      // 循环验证
      Object.keys(rules).forEach(v => {
        if (!valid) return;
        if (!rules[v].value) {
          this.$message.warning(rules[v].message);
          valid = false;
        }
      });
      // 验证不通过直接返回，不进行下面的操作
      if (!valid) {
        return;
      }
      this.$axios({
        url: "/airs",
        params: this.form
      }).then(res => {
        console.log(res);
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
