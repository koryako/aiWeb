const http = require("http");
const util = require("util"); //nodejs一些工具
const path = require("path");
const fs=require("fs");
import * as faceapi from 'face-api.js';



import { canvas, faceDetectionNet, faceDetectionOptions, saveFile } from './commons';

const REFERENCE_IMAGE = path.resolve(__dirname, '../images/bbt1.jpg')
const QUERY_IMAGE = path.resolve(__dirname, '../images/bbt4.jpg')
//const port = require("port");
const formidable = require("formidable");
const fileSaveDir=path.join(__dirname,'uploads');

const weights= path.resolve(__dirname, '../weights')
//console.log(weights)
const matchdj="-0.04612775892019272,0.15554948151111603,0.04800749942660332,-0.028178846463561058,-0.0403561070561409,-0.035227470099925995,-0.034923262894153595,-0.1285109519958496,0.1520327478647232,-0.10640303045511246,0.28802019357681274,-0.050649095326662064,-0.24175003170967102,-0.05183567851781845,-0.04642539471387863,0.19183239340782166,-0.21643489599227905,-0.16131338477134705,0.0028544701635837555,-0.051793862134218216,0.06521323323249817,0.026666227728128433,-0.03124287910759449,-0.03846089914441109,-0.11309019476175308,-0.3208887279033661,-0.10722088068723679,-0.0613417774438858,-0.010136249475181103,-0.053724657744169235,-0.030378134921193123,0.029569299891591072,-0.11291912943124771,-0.0215933695435524,0.07684540748596191,0.06103534251451492,-0.03683921694755554,0.0062182252295315266,0.20737715065479279,0.03372160345315933,-0.18379178643226624,0.04562811553478241,0.07775316387414932,0.31960684061050415,0.1726524978876114,0.06910405308008194,0.007139573339372873,-0.17870618402957916,0.05927394703030586,-0.18349432945251465,0.025078853592276573,0.16113018989562988,0.08626130223274231,0.10097939521074295,0.053857576102018356,-0.14950960874557495,-0.0011913341004401445,0.09749405831098557,-0.16549991071224213,0.06309998035430908,0.1320161521434784,-0.0812201201915741,-0.025633564218878746,-0.10950551927089691,0.24581167101860046,0.050971630960702896,-0.15605878829956055,-0.18764853477478027,0.10812478512525558,-0.150363028049469,-0.17115461826324463,0.07749245315790176,-0.11432080715894699,-0.2126164585351944,-0.33818385004997253,0.028576742857694626,0.41543325781822205,0.14709126949310303,-0.19834206998348236,0.02119370363652706,0.039824292063713074,-0.031154409050941467,0.18755288422107697,0.1420687735080719,-0.054554764181375504,0.018360307440161705,-0.10732250660657883,-0.023171870037913322,0.21546369791030884,-0.03586960211396217,-0.08435732871294022,0.16751357913017273,-0.07537040114402771,0.12577922642230988,0.0035609868355095387,0.07436311990022659,-0.07734618335962296,0.05156765505671501,-0.17123305797576904,-0.06323384493589401,0.015968281775712967,-0.0654875710606575,-0.006926588714122772,0.16251219809055328,-0.12710979580879211,0.1414022445678711,-0.034176502376794815,0.015505185350775719,-0.053360335528850555,0.04300238937139511,-0.0649300068616867,0.009973220527172089,0.15662246942520142,-0.27519941329956055,0.21218326687812805,0.21517877280712128,0.030813299119472504,0.09141255170106888,0.11561564356088638,0.05719870701432228,-0.04924081638455391,-0.02700512856245041,-0.2510931193828583,-0.048223383724689484,0.004267212934792042,-0.02558945119380951,0.13000717759132385,0.002014872385188937"
async function loadweight() {
await faceDetectionNet.loadFromDisk(weights)
await faceapi.nets.faceLandmark68Net.loadFromDisk(weights)
await faceapi.nets.faceRecognitionNet.loadFromDisk(weights)
}
loadweight() 
async function run(t) {
  const djdescriptor= matchdj.split(',');
  //await faceDetectionNet.loadFromDisk(weights)
  //await faceapi.nets.faceLandmark68Net.loadFromDisk(weights)
  //await faceapi.nets.faceRecognitionNet.loadFromDisk(weights)
  const referenceImage = await canvas.loadImage(REFERENCE_IMAGE)
  const queryImage = await canvas.loadImage(QUERY_IMAGE)
  const q = await canvas.loadImage(t)
 // console.log(djdescriptor.length)
 // console.log(djdescriptor.buffer)
  var djbuffer=new Float32Array(128);
  for (var i=0;i<djdescriptor.length;i++){
    djbuffer[i]=djdescriptor[i]

  }
 // console.log(djbuffer.length)
 // const resultsRef = await faceapi.detectSingleFace(q, faceDetectionOptions)
  //  .withFaceLandmarks()
  // .withFaceDescriptor()
//console.log(resultsRef.descriptor.join())

 const resultsQuery = await faceapi.detectSingleFace(q, faceDetectionOptions)
  .withFaceLandmarks()
   .withFaceDescriptor()

    const labeledDes=[new faceapi.LabeledFaceDescriptors('dj',[djbuffer])]

  const faceMatcher = new faceapi.FaceMatcher(labeledDes)
 // console.log(faceMatcher)
/*
  const labels = faceMatcher.labeledDescriptors
    .map(ld => ld.label)
  const refDrawBoxes = resultsRef
    .map(res => res.detection.box)
    .map((box, i) => new faceapi.draw.DrawBox(box, { label: labels[i] }))
  const outRef = faceapi.createCanvasFromMedia(referenceImage)
  refDrawBoxes.forEach(drawBox => drawBox.draw(outRef))

  saveFile('referenceImage.jpg', (outRef).toBuffer('image/jpeg'))
*/
 
    const bestMatch = faceMatcher.findBestMatch(resultsQuery.descriptor)
    console.log(bestMatch.toString())
   // return new faceapi.draw.DrawBox(res.detection.box, { label: bestMatch.toString() })
 // if (bestMatch){
     // callback('ok')
   //  return true;
  //}
  //const outQuery = faceapi.createCanvasFromMedia(queryImage)
 // queryDrawBoxes.forEach(drawBox => drawBox.draw(outQuery))
 // saveFile('queryImage.jpg', (outQuery).toBuffer('image/jpeg'))
  //console.log('done, saved results to out/queryImage.jpg')


}
module.exports={
    ups:(req,res)=>{

       // 参考代码https://github.com/whxaxes/node-test/blob/master/server/upload/index_2.html


    },

    up:(req,res)=>{
       /* res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
       */
      
          
      res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
      res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,Origin,Accept,X-Requested-With');
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.header('Access-Control-Allow-Credentials', true);
      res.header('X-Powered-By', ' 3.2.1');
      res.header('Content-Type', 'application/json;charset=utf-8');
       
        if (!fs.existsSync(fileSaveDir)){
            fs.mkdirSync(fileSaveDir)
        }
        let form=new formidable.IncomingForm();
        form.uploadDir=fileSaveDir;
          
        
        form.parse(req,function(err,fields,files){
            
           
           if (files.imagefile){
        
             let filename=path.basename(files.imagefile.path)
             console.log(filename)
            run(files.imagefile.path)
                  
           }
           
           
        })

       
       res.json({msg:"上传图片成功"});
        
    }
}