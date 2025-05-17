import express from 'express';
const router=express.Router();
import File from '../models/file.js';


import multer from 'multer';

import path from 'path';
import { v4 as uuid4 } from 'uuid';


let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'upload/') ,
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
              cb(null, uniqueName)
    } ,
});

let upload=multer({
    storage  
}).single('myfile');


router.post('/', (req,res) => {
   
    //store files using upload folder
    upload(req,res,async (err) => {
            
          if(err) { 
            console.log("hi");
            console.log(err)
                return res.status(500).send({error:err.message});
            }
            //storing data into database of files --need model
            console.log(req.file);
            console.log(req.title);
            const file=new File({
            filename :req.file.filename,
            title:req.body.title,
            uuid: uuid4(),
            path:req.file.path,
            size:req.file.size
        });

        const response=await file.save();
        res.json({file: `${process.env.APP_BASE_URL}/files/${response.uuid}`});
        });


});
 

export default router;