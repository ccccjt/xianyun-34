export const state = ()=>{
    return {
        searchHistory:[]
   };
   }
   export const mutations= {
       setSearchHistory(state,data){
           state.searchHistory.unshift(data)
           //没有引用删除记录的方法，历史记录只保存5条
           state.searchHistory.length=5
       },
       //删除历史记录的方法，页面并没有引用
       delSearchHistory(state,index){
           state.searchHistory.splice(index,1)
       }
   } 
   