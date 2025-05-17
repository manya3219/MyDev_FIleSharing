import express from 'express';
const router=express.Router();
import File from '../models/file.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


router.get('/:uuid',async(req,res) => {
    const file = await File.findOne({uuid: req.params.uuid});
    if(!file){
        return res.render('download',{error : 'link has been expired.'});
    }
    const response = await file.save();
    const filePath= `${__dirname}/../${file.path}`;
    
    console.log(filePath);
    res.download(filePath);
}); 
export default router;