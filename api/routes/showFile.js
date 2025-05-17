import express from 'express';
const router=express.Router();
import File from '../models/file.js';


router.get("/:uuid", async (req,res) =>{
   try{
    const file=await File.findOne({filename: req.params.uuid});
    if(!file){
        return res.render('download',{error:'link is expired'});
    }
    return res.render('download',{
            _id:file.id,
            uuid:file.uuid,
            fileName:file.filename,
            fileSize:file.size,
            downloadLink:`${process.env.APP_BASE_URL}/file/download/${file.uuid}`
        
    });

   }catch(err){
       return res.render('download',{error:'something went wrong.'});
   }
})

export default router;