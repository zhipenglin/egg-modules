module.exports=async (ctx,hostname)=>{
    let account={};
    try{
        const res=await ctx.fetch('/account/get_bole_info',{
            hostname,
            headers:ctx.headers
        });
        if(res.data.err_no==0){
            account=res.data.results;
        }else{
            account={};
        }

    }catch(e){
        account={};
    }
    return account;
};
