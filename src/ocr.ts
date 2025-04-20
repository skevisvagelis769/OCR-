import { createWorker }  from 'tesseract.js'
import fs from 'fs'
import multer from 'multer'

const worker =  createWorker()
const storage = multer.diskStorage({
    destination:(req,response,cb) => {
        cb(null,"./uploads")

    },
    filename: (req:any,res,cb) =>{
        cb(null,req.file)
    }
})

const upload = multer({storage: storage}).single("avatar")




