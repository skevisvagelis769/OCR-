import express  from "express";
import mongoose from 'mongoose'
import morgan from 'morgan'
import { fileURLToPath } from 'url'
import path ,{dirname} from 'path'
import bodyParser from 'body-parser'
import { createWorker }  from 'tesseract.js'
import fs from 'fs'
import multer from 'multer'



mongoose.connect("mongodb://localhost:27017/HISTORY")

const db = mongoose.connection
const port:number = 3000
const address: string = '127.0.0.2'
db.on('error',(err)=>{
    console.log(err)
})
db.on("open",()=>{
    console.log("Connected to DB!!")
})
const app = express()
const _file = fileURLToPath(import.meta.url)
const _dir = path.dirname(_file)
app.use(morgan('dev'))
/* app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json()) */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
//app.use(express.static('dist/FRONTEND'))



const worker =  createWorker()
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"./uploads")

    }
    /* filename: (req:any,res,cb) =>{
        cb(null,req.file)
    } */
})

 const upload = multer({storage:storage,limits:{fileSize:50*1024*1024}})

 app.set("view engine","ejs")
 app.get('/',(req,res)=>{
    //res.sendFile(path.join(_dir+"./FRONTEND/index.ejs"))
    res.render("index.ejs")
})


app.post('/uploads',upload.single('in'),(req,res)=>{
    console.log("in server")
    const file = req.body.file
    const file2 = req.body
   
    console.log("Received file",file,file2)
     /* upload(req,res,err=>{
        
        console.log("in the server")
        console.log(req.file)
    }) 
     */
    
})




app.listen(port,address,()=>console.log(`Listening at http://${address}:${port}`))