
const keyListController=require('../controllers/keyList.js')

module.exports=(router)=>{
   router.get('/customlink/keylist',keyListController.get);
}