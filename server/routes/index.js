
//const keyList=require('./keyList.js');
const face=require('./face.js');
const up=require('./up.js');
const ui=require('./ui.js');
module.exports=(router)=>{
    face(router);
    up(router);
    ui(router);
    return router
};