// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//import {faceapi}  from 'face-api.js';

//import "babel-polyfill";
onload = () => {

    const webview = document.querySelector('webview')
   
    const {canvas} = require('canvas');
    const faceapi = require('face-api.js');
    console.log(faceapi.nets.ssdMobilenetv1);
function getCurrentFaceDetectionNet() {

  return faceapi.nets.ssdMobilenetv1

}

function isFaceDetectionModelLoaded() {
return !!getCurrentFaceDetectionNet().params
}


async function loadmodel(){
  const MODEL_URL = 'static/'
  const img = await faceapi.fetchImage('bbt1.jpg')
  document.getElementById('myImg').src = img.src
  if (!isFaceDetectionModelLoaded()) {
   await getCurrentFaceDetectionNet().loadFromUri(MODEL_URL)
  }
}



async function updateResults() {
  if (!isFaceDetectionModelLoaded()) {//是否加载模型
    return
  }
  const inputhtml = document.getElementById('myImg')
  const minConfidence = 0.8
  const results = await faceapi.detectAllFaces(inputhtml,new faceapi.SsdMobilenetv1Options({ minConfidence }))
 //console.log(fullFaceDescriptions)
 const canvas = document.getElementById('overlay')
 faceapi.matchDimensions(canvas, inputhtml)
 faceapi.draw.drawDetections(canvas, faceapi.resizeResults(results, inputhtml))
}

  async function run() {
    // load face detection
    await loadmodel()
    // start processing image
    updateResults()
  }

 
   run()




    //const indicator = document.querySelector('.indicator')
    
   /* const loadstart = () => {
      indicator.innerText = 'loading...'
    }

    const loadstop = () => {
      indicator.innerText = ''
    }

    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)*/

   

  }