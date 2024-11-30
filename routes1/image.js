var express = require('express');
// var knex = require('knex');
var router = express.Router();
const knex = require('../knex_files');
const moment = require("moment-timezone")
var multer = require('multer')



router.get('/', function (req, res) {
    var status = "truse"
    res.render('image', { status })
})


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../home/laxmig/public_html/betting/pictures')
       // cb(null, '../picture')


    },

    filename: function (req, file, cb) {
var file_name = Date.now() + file.originalname;
        cb(null, file_name)

        const date = moment().tz('Asia/Kolkata').format('DD-MM-yyyy');

        knex("image").insert({ img_name:file_name, date: date }).then(result => {
            console.log('insurt result ------------->  ', result);
        })
    }
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