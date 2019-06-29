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
  }
})
// 设置一个更新 commin
export const mutations = {
  // 修改搜索内容
  setSearchValue(state, data) {
    state.searchValue = data
  },
  // 切换页面数据量
  handleSizeChange(state, data) {
    state.list.pageSize = data;
  },
  // 切换到第几页
  handleCurrentChange(state, data) {
    state.list.currentPage = state.list.pageSize * (data - 1);
  },
  // 更新获取到是文章数据
  setArticleList(state, data) {
    state.articleList = data
  }
}
// 存放共同异步方法进行优化 dispatch
export const actions = {
  // 获取文章数据
  getList({ state, commit }) {
    console.log(state)
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
      state.list.total = result.data.total;
    });
  }
}