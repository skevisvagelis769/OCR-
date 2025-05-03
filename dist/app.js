import express from "express";
import mongoose from 'mongoose';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import path from 'path';
import { createWorker } from 'tesseract.js';
import multer from 'multer';
mongoose.connect("mongodb://localhost:27017/HISTORY");
const db = mongoose.connection;
const port = 3000;
const address = '127.0.0.2';
db.on('error', (err) => {
    console.log(err);
});
db.on("open", () => {
    console.log("Connected to DB!!");
});
const app = express();
const _file = fileURLToPath(import.meta.url);
const _dir = path.dirname(_file);
app.use(morgan('dev'));
app.use(express.json());
const worker = createWorker();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./dist/uploads");
    }, filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });
app.use(express.static(_dir + '/FRONTEND'));
app.use('/uploads', express.static('uploads'));
app.post('/single', upload.single('in'), function (req, res, next) {
    console.log("in server");
    res.sendFile(_dir + "/FRONTEND/index.html");
    /*  console.log(JSON.stringify(req.file))
     var response = "File uploaded.<br>"
      res.send(response) */
});
app.listen(port, address, () => console.log(`Listening at http://${address}:${port}`));
