// 创建一个本地仓库
export const state=()=>({
    // 搜索时输入的内容
    searchValue:""
})
// 设置一个更新 commint
export const mutations={
    setSearchValue(state,data){
        state.searchValue = data
    }
}
// 存放共同异步方法进行优化 dispatch
export const actions={

}