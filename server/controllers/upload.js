const http = require("http");
const util = require("util"); //nodejs一些工具
const path = require("path");
const port = require("port");
const formidable = require("formidable");

module.exports={

    up:(req,res)=>{

        res.json({msg:"save"});
        
    }
}