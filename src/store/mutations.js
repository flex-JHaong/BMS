export default {
    //变更store中的数据
        // 只有mutation中定义的函数，才有权利修改state中的数据
        setmenulist(state,data){
            state.menulist=data;
        },
        setrolelist(state,data){
            state.rolelist=data;
        },
        setuserinfo(state,data){
            state.userinfo=data;
        },
        setcatelist(state,data){
            state.catelist=data;
        },
        setonecate(state,data){
            state.onecate=data;
        },
        setspecslist(state,data){
            state.specslist=data;
        },
        loginout(state,data){
            state.userinfo=null;
        },
}