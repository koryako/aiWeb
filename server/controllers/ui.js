const path = require("path");
module.exports={

    go:(req,res)=>{
     
      const page=  path.join(__dirname,"./index_2.html")
      

        res.render(page)
        
    }
}