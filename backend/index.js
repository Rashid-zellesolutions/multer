const express = require('express');
const cors = require('cors');
const multer = require('multer');
// const uploads = multer({dest: 'uploads/'})
const path = require('path')

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        return cb(null, "./uploads")
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})
const uploads = multer({storage})

// app.post('/uploads', uploads.single('file'), (req, res) => {
//     console.log(req.body);
//     console.log(req.file);
    
// })
app.post('/uploads', uploads.array('file', 2), function(req, res, next) {
    console.log(req.body);
    console.log(req.file)
})


app.listen(PORT, () => {
    console.log(`server is running on ${PORT} port`)
})