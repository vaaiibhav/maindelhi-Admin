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
    var status = "true"
    sam();
    async function sam() {
        const date = moment().tz('Asia/Kolkata').format('yyyy-MM-DD');
        await knex('delhi_day').select("*").where('date', date).then(async result_date => {
            console.log('THis is Length of result   =-------> ', result_date.length);
            console.log('THis is Length of result   =-------> ', result_date);
            if (result_date.length == 0) {
                await knex('delhi_day').insert({ lt1_25: value1, left: value2, date: date,status : status }).then(result => {
                    console.log('This is insert result arter installation ', result);
                    res.render('dashboard', { status })
                })
            } else {
                await knex('delhi_day').where('date', result_date[0].date).update({ lt1_25: value1, left: value2,status : status }).then(result => {
                    res.render('dashboard')
                })
            }
        })
    }
})
/* ---------------------- router is for 11:30 ---------------------- */
router.post('/right_value', function (req, res, next) {
    var status;
    var value1 = req.body.value1;
    var value2 = req.body.value2;
    var status ="true";
    const date = moment().tz('Asia/Kolkata').format('yyyy-MM-DD');
    knex('delhi_day').select("*").where('date', date).then(result_date => {
        console.log('THis is Length of result   =-------> ', result_date.length);
        console.log('THis is Length of result   =-------> ', result_date);
        status = 'true'
        knex('delhi_day').update({ rt3_00: value1, right: value2 ,status : status}).where('date', date).then(result => {
            console.log('This is insurt result arter installation ', result);
            res.render('dashboard', { status })
        })
    })
})

router.get('/day', function (req, res, next) {
    var date = moment().tz('Asia/Kolkata').format('yyyy-MM-DD');
    knex('delhi_day').select('*').where('date', date).then(result => {
        if (result.length == 0) {
            var res_result = "000-00-000"
            res.send(res_result);
        } else {

            if ((result[0].lt1_25 == "" || result[0].lt1_25 == null) && (result[0].left == "" || result[0].left == null)) {
                result[0].left = "*"
                result[0].lt1_25 = "***"

            }
            if ((result[0].rt3_00 == null || result[0].rt3_00 == "") && (result[0].right == null || result[0].right == "")) {
                result[0].right = "*"
                result[0].rt3_00 = "***"
           

            }
            var res_result = result[0].lt1_25 + '-' + result[0].left + result[0].right + "-" + result[0].rt3_00;
            res.send(res_result)


        }
    })
})



router.post('/old_data', function (req, res, next) {
    var lv = req.body.value;
    var l = req.body.Lvalue;
    var rv = req.body.value1;
    var r = req.body.value2
    var date = req.body.date
    var status
    // date = moment(date).format("DD-MM-YYYY")
    knex('delhi_day').select('*').where('date', date).then(result_date => {
        if (result_date.length == 0) {
            status = "true"
            knex('delhi_day').insert({ lt1_25: lv, left: l, rt3_00: rv, right: r, date: date }).then(result => {
                res.render('add_date', { status })
            }) 
        } else {
            status = "false"
            res.render('add_date', { status })

        }
    })
})

router.get('/set_res',function (req,res,next) {
    var status = req.query.result_btn;
        knex('delhi_day').update({status : status}).orderBy('id', 'desc').limit(1).then(result1=>{
            res.render('dashboard')
        })

})

module.exports = router;