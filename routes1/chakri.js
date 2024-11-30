var express = require('express');
// var knex = require('knex');
var router = express.Router();
const knex = require('../knex_files');
const moment = require("moment-timezone")
router.post('/', function (req, res, next) {
})
/* ---------------------- router is for 11:30 ---------------------- */
router.post('/left_value', function (req, res, next) {
    var status;
    var value1 = req.body.value;
    var value2 = req.body.Lvalue;
    sam();
    async function sam() {
        const date = moment().tz('Asia/Kolkata').format('DD-MM-yyyy');
        await knex('chakri_bajar').select("*").where('date', date).then(async result_date => {
            console.log('THis is Length of result   =-------> ', result_date.length);
            console.log('THis is Length of result   =-------> ', result_date);
            if (result_date.length == 0) {
                status = 'true'
                await knex('chakri_bajar').insert({ value1: value1, date: date }).then(result => {
                    console.log('This is insurt result arter installation ', result);
                    res.render('dashboard')
                })
            } else {
                await knex('chakri_bajar').where('date',result_date[0].date ).update({ value1: value1}).then(result => {
                    res.render('dashboard')
                })
            }
        })
    }
})

module.exports = router;