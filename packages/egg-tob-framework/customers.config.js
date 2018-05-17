const {get}=require('lodash'),list=['valeo','tianhua','greentown','newcommon','autoliv','globalegrow'];

const getModuleGenerator=({list})=>(account)=>{
    const customize=get(account,'customize');
    if(list.indexOf(customize)>-1) return customize;
};

module.exports={
    list,getModuleGenerator,getModule:getModuleGenerator({list})
};
