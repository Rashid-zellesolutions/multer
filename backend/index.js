const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs')
const path = require('path')

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

const DB_URI = "mongodb+srv://rashidalizellesolutions:Sniper+122@mycluster.v4cfzgl.mongodb.net/image-upload-multer"

mongoose.connect(DB_URI).then(() => {console.log("Connected")}).then((e) => {console.log(e)})

const imageSchema = new mongoose.Schema({
    imageName: String,
    // imageData: Buffer
})

const Image = mongoose.model("Image", imageSchema)

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./uploads")
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}_${file.originalname}`);
    }
})
// const storage = multer.memoryStorage()
const uploads = multer({storage})

app.post('/uploads', uploads.single('file'), async (req, res) => {
    console.log(req.file.path)
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }
        const imageFullName = req.file.path;
        const image = new Image({
            imageName: imageFullName,
            // imageData: fs.readFileSync(path.join(__dirname, `./uploads/${req.file.filename}`))
        })
        await image.save();
        console.log("image saved in database");
        res.status(201).send('image saved')

    } catch (error) {
        console.log(error);
        res.status(500).send('image not found')
    }
    
})

app.get('/images', async(req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json({success: true, images})
        
    } catch (error) {
        console.log(error);
        res.status(500).send('internal server error');
    }
})
// app.post('/uploads', uploads.array('file', 2), function(req, res, next) {
//     console.log(req.body);
//     console.log(req.file)
// })


app.listen(PORT, () => {
    console.log(`server is running on ${PORT} port`)
})