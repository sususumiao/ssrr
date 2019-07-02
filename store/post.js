import moment from "moment";
// 创建一个本地仓库
export const state = () => ({
  // 搜索时输入的内容
  searchValue: "",
  // 文章总数据
  articleList: [],
  // 分页器数据
  list: {
    currentPage: 0,
    total: 0,
    pageSize: 3
  },
  //  保存文章id
  articlId: "",
  //  保存草稿数据
  draftsList: []
})
// 设置一个更新 commin
export const mutations = {
  // 修改搜索内容
  setSearchValue(state, data) {
    state.searchValue = data
  },
  // 改变文章数量
  setArticleList(state, data) {
    state.articleList = data
  },
  // 修改total的值
  setTotalValue(state, data) {
    state.list.total = data
  },
  // 切换页面数据数量
  handleSizeChange(state, data) {
    state.list.pageSize = data;
  },
  // 切换页面方法
  handleCurrentChange(state, data) {
    state.list.currentPage = state.list.pageSize * (data - 1);
  },
  // 修改文章id
  setArticlId(state, data) {
    state.articlId = data
  },
  // 将数据添加到草稿
  setDraftsList(state, data) {
    const newData = {
      ...data,
      time:moment(new Date()).format('YYYY-MM-DD')
    }
    state.draftsList.push(newData)
  }
}
// 存放共同异步方法进行优化 dispatch
export const actions = {
  // 获取文章数据
  getList({ state, commit }) {
    const city = state.searchValue;
    let params = {
      _start: state.list.currentPage,
      _limit: state.list.pageSize
    };
    // 判断搜索框是否有内容
    if (city != "") {
      params = { ...params, city };
    }
    this.$axios({
      url: "/posts",
      params
    }).then(result => {
      const { data } = result.data;
      commit('setArticleList', data)
      commit('setTotalValue', result.data.total)
      // state.list.total = result.data.total;
    });
  }
}