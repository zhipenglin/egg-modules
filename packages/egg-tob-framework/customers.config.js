const {get}=require('lodash'),list=require('ic-get-customize-config').all;

const getModuleGenerator=({list})=>(account)=>{
    const customize=get(account,'customize');
    if(list.indexOf(customize)>-1) return customize;
};

module.exports={
    list,getModuleGenerator,getModule:getModuleGenerator({list})
};
