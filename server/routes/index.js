
//const keyList=require('./keyList.js');
const face=require('./face.js');
const up=require('./up.js');
module.exports=(router)=>{
    face(router);
    up(router);
    return router
};