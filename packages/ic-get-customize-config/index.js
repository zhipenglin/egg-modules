/**
 * @name: ic-get-customize-config ;
 * @author: admin ;
 * @description: 获取定制配置 ;
 * */

const fs = require('fs-extra'),
    get=require('lodash/get'),
    intersection=require('lodash/intersection'),
    path=require('path');

const basePath=process.cwd(),customizePath=path.resolve(basePath, 'customize.json');
let customize={};
try {
    const customizeString=fs.readFileSync(customizePath);
    customize=JSON.parse(customizeString),all=get(customize,'all',[]),updateList=get(customize,'updateList',[]);
    if(all.indexOf('common')){
        all.splice(0,0,'common');
    }
    customize.updateList=intersection(all,updateList);
}catch (e) {
    console.warn(`未找到${customizePath}文件，或配置文件不合法`);
}

module.exports={
    ...customize,
    devTarget:(!customize.devTarget||customize.devTarget==='common')?'':customize.devTarget,
    getFeatures:(name)=>{
        return get(customize,`features[${name}]`,[]);
    }
};
