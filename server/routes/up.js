const upload=require('../controllers/upload.js')

module.exports=(router)=>{
   router.get('/upload',upload.up);
}