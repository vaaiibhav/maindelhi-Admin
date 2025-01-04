var express = require('express');
// var knex = require('knex');
var router = express.Router();
const knex = require('../knex_files');
const moment = require("moment-timezone")
var multer = require('multer')
const fs = require('fs');
const path = require('path');


router.get('/', function (req, res) {
    var status = "truse"
    res.render('image', { status })
})


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'image'); // Resolve absolute path to the image folder
    
    // Check if the directory exists, create it if not
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
    filename: function (req, file, cb) {
var file_name = Date.now() + file.originalname;
        cb(null, file_name)

        const date = moment().tz('Asia/Kolkata').format('DD-MM-yyyy');

        knex("image")
      .insert({
        img_name:
          ("http://maindelhimatka.com:3222/published-images/" + file_name).trim(),
        date: date,
      })
      .then((result) => {
        console.log("insurt result ------------->  ", result);
      });
  },
})
var upload = multer({ storage: storage })



router.post('/upload', upload.single('profile-file'), function (req, res, next) {

    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    console.log(JSON.stringify(req.file))
    var f = JSON.stringify(req.file)
    // var file_name = f.originalname;
   // console.log('=------------------->> ', file_name);

    res.redirect("/image")
})
module.exports = router