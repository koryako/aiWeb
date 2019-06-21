const upload=require('../controllers/upload.js')

module.exports=(router)=>{
  router.options('/upload',upload.up);
   router.post('/upload',upload.up);
}