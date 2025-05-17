// routes/fileRouter.js
import express from 'express';
import File from '../models/file.js';

const router = express.Router();
import { verifyToken } from '../utils/verifyUser.js';

// Get all files
router.get('/', async (req, res) => {
  try {
    console.log(req.body);
    const files = await File.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get("/:uuid", async (req,res) =>{
 
  console.log(req.params.uuid);
 
  try{
   const file=await File.findOne({uuid: req.params.uuid});
   if(!file){
       return res.render('download',{error:'link is expired'});
   }
   console.log(`${process.env.APP_BASE_URL}/file/download/${file.uuid}`);
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
});




export default router;
