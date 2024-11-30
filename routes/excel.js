var express = require('express');
const knex = require('../knex_files');
var router = express.Router();
// const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const crypto = require('crypto');
const moment = require('moment');
const path = require('path');
const readxlsxFile = require('read-excel-file/node');
// var dateformat = import('../../node_modules/dateformat/lib/dateformat.js');
var multer = require('multer')
// var session = require('express-session');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './import/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now());
  }

});
var message;
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      message = "Succesfully uploaded";
      cb(null, true);

    } else {

      cb(null, false);
      return cb(new Error('Only .xlsx format allowed!'));
    }
  }
})
var filename;




// router.post('/product_details', upload.single('avatar'), async function (req, res, next) {
router.get('/', function (req, res, next) {
  console.log('sssssssssssssssssssssssssssssssssssssssssssssssssss');
  let tutorials = [];
  async function letssendthis() {
    readxlsxFile('/home/maindelh/public_html/admin/delhi.xlsx').then((rows) => {
      console.log(rows);
      console.table(rows);
      var i, j;
      rows.shift();
      rows.forEach((row) => {
        let tutorial = {
          date: row[0],
          value: row[1],
          value2: row[2],
          n_value: row[3],
          n_value2: row[4],
        };
        tutorials.push(tutorial);
      });

      console.log("tutorials", tutorials);
      for (var i = 0; i < tutorials.length; i++) {
        var d = moment(tutorials[i].date);
        d = d.format("YYYY-MM-DD");
        console.log("cd ===== ", d);
        knex('delhi_teer').insert({
          'date': d,
          'value': tutorials[i].value,
          'value2': tutorials[i].value2,
          'n_value': tutorials[i].n_value,
          'n_value2': tutorials[i].n_value2,

        })
          .then((result) => {
            console.log("result==========", result);
          })
      }
      res.json("zhala")
    })
  }
  letssendthis();

  // function convertDate(d) {
  //   var converted_date = dateformat("yyyy-mm-dd")
  //   return converted_date;
  // }


})
module.exports = router;