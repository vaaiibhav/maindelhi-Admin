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
    var sta ='true'
    sam();
    async function sam() {
        const date = moment().tz('Asia/Kolkata').format('yyyy-MM-DD');
        await knex('kalyan').select("*").where('date', date).then(async result_date => {
            console.log('THis is Length of result   =-------> ', result_date.length);
            console.log('THis is Length of result   =-------> ', result_date);
            if (result_date.length == 0) {
                status = 'true'
                await knex('kalyan').insert({ value1: value1, left_no: value2, date: date,status:sta }).then(result => {
                    console.log('This is insurt result arter installation ', result);
                    res.render('dashboard', { status })
                })
            } else {
                await knex('kalyan').where('date', result_date[0].date).update({ value1: value1, left_no: value2,status:sta }).then(result => {
                    console.log('Date==> ', result_date[0].date);
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
    var sta = 'true'
    const date = moment().tz('Asia/Kolkata').format('yyyy-MM-DD');
    knex('kalyan').select("*").where('date', date).then(result_date => {
        knex('kalyan').update({ value2: value1, right_no: value2,status:sta }).where('date', date).then(result => {
            res.render('dashboard')
        })
    })
})


router.get('/kalyan', function (req, res, next) {
    var date = moment().tz('Asia/Kolkata').format('yyyy-MM-DD');
    knex('kalyan').select('*').where('date', date).then(result => {
        if (result.length == 0) {
            var res_result = "000-00-000"
            res.send(res_result);
        } else {
        
            if ((result[0].value1 == "" || result[0].value1 == null) && (result[0].left_no == "" || result[0].left_no == null)) {
                result[0].left_no = "*"
                result[0].value1 = "***"
        
            }
            if ((result[0].value2 == "" || result[0].value2 == null) && (result[0].right_no == "" || result[0].right_no == null)) {
                result[0].right_no = "*"
                result[0].value2 = "***"
        
        
            }
            var res_result = result[0].value1 + '-' + result[0].left_no + result[0].right_no + "-" + result[0].value2;
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
    knex('kalyan').select('*').where('date', date).then(result_date => {
        console.log("RRRRRRRRRRRRRRRRR->",req.body);
        if (result_date.length == 0) {
            status ="true"
            knex('kalyan').insert({ value1: lv, left_no: l, value2: rv, right_no: r, date: date }).then(result => {
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
        knex('kalyan').update({status : status}).orderBy('id', 'desc').limit(1).then(result1=>{
            res.render('dashboard')
        })

})

module.exports = router;