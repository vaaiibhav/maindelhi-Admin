var express = require('express');
// var knex = require('knex');
var router = express.Router();
const knex = require('../knex_files');

router.get('/', function (req, res) {
    res.render('dashboard')
})

router.get('/add_date',function (req,res,next) {
    var status = "true";
    res.render('add_date', { status} )
})




module.exports = router;