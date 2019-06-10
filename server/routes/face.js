
const faceController=require('../controllers/faceRecognition.js')

module.exports=(router)=>{
   router.get('/face',faceController.get);
}