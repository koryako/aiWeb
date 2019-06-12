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

async function run(t) {
    const weights= path.resolve(__dirname, '../weights')
    //console.log(weights)
  await faceDetectionNet.loadFromDisk(weights)
  await faceapi.nets.faceLandmark68Net.loadFromDisk(weights)
  await faceapi.nets.faceRecognitionNet.loadFromDisk(weights)

  const referenceImage = await canvas.loadImage(REFERENCE_IMAGE)
  const queryImage = await canvas.loadImage(QUERY_IMAGE)
  const q = await canvas.loadImage(t)
  console.log(q)

  const resultsRef = await faceapi.detectSingleFace(q, faceDetectionOptions)
    .withFaceLandmarks()
    .withFaceDescriptor()
  //  console.log(resultsRef)

  const resultsQuery = await faceapi.detectSingleFace(q, faceDetectionOptions)
    .withFaceLandmarks()
    .withFaceDescriptor()

    const labeledDes=[new faceapi.LabeledFaceDescriptors('dj',[resultsRef.descriptor])]

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

      
        res.json({msg:"save"});
        
    }
}