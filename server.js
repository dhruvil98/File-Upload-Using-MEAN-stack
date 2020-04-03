const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const fs= require('fs');

const app = express();

app.set('view engine','ejs');

var storage = multer.diskStorage({
    destination:function(req,file,callback){
        var dir = "./uploads";

        if(!fs.existsSync(dir))
        {
            fs.mkdirSync(dir);
        }
        callback(null,dir);
    },
    filename : function(req,file,callback){
        callback(null,file.originalname);
    }
});


var upload = multer({storage:storage}).array('files',12);

app.post('/upload',(req,res,next)=>{

    upload(req,res,function(err){
        if(err){
            return res.send("something wrong");
        }
        else{
            res.send("upload complete");
        }
    })
});



app.get('/',(req,res)=>{
    res.render('index');
})

app.listen(3000);