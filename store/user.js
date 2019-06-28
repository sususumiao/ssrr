
// 创建一个本地仓库
export const state = () => ({
    userInfo: {
        token: "",
        user: {}
    }
})
// 创建一个更新本地仓库
export const mutations = {
    getUserInfo(state, data) {
        state.userInfo = data
    },
    setUserInfo(state){
        state.userInfo ={
            token: "",
            user: {}
        }
    }
}
// 存放公共的异步的方法
export const actions = {
    getPostUserInfo({ commit }, data) {
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        }).then(res => {
            commit('getUserInfo', res.data)
            Promise.resolve()
        })
    }
}