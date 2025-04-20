import express  from "express";
import mongoose from 'mongoose'
import morgan from 'morgan'
import { fileURLToPath } from 'url'
import path ,{dirname} from 'path'
import bodyParser from 'body-parser'

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
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('dist/FRONTEND'))
app.get('/',(req,res)=>{
    res.sendFile(path.join(_dir+"./FRONTEND/index.html"))
})



app.listen(port,address,()=>console.log(`Listening at http://${address}:${port}`))