

export const state = ()=>{
 return {
     userInfo:{

     }
};
}
export const mutations= {
    setUserInfo(state,data){
        state.userInfo=data
    },
    clearUserInfo(state){
        state.userInfo={}
    }
} 
