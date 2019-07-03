// 创建本地仓库
export const state=()=>({

})



// 更新state里面的数据
export const mutations={

}


// 存放异步共享
export const actions={
    // 获取验证码
    getVerification(dataTel){
      return  this.$axios({
            url:'/captchas',
            method:"POST",
            data:{
                tel:dataTel
            }
        }).then(res=>{
            const{data} = res
            // Promise.resolve()
            alert(data.code)
            // this.$message('验证码为：'+data.code+"请赶紧输入。")   
        })
    }
}