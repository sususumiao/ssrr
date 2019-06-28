// 创建一个本地仓库
export const state = ()=>({
    userInfo:{
        token:"1212",
        name:'小狗',
    }
})
// 创建一个更新本地仓库
export const mutations={
    getToke(state,data){
        state.userInfo = data
    }
}
// 优化
export const actions={
    
}