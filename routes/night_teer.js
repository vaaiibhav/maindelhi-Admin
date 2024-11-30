var express = require('express');
// var knex = require('knex');
var router = express.Router();
const knex = require('../knex_files');
const moment = require("moment-timezone")
router.post('/', function (req, res, next) {
})
/* ---------------------- router is for teer values ---------------------- */

//for night teer
router.post('/n_values', function (req, res, next) {
    var status;
    var value1 = req.body.value;
    var status = "true"
    sam();
    async function sam() {
        const date = moment().tz('Asia/Kolkata').format('yyyy-MM-DD');
        await knex('delhi_teer').select("*").where('date', date).then(async result_date => {
            if (result_date.length == 0) {
                await knex('delhi_teer').insert({ n_value: value1, date: date, n_status: status }).then(result => {
                    res.render('dashboard', { status })
                })
            } else {
                await knex('delhi_teer').where('date', result_date[0].date).update({ n_value: value1, n_status: status }).then(result => {
                    res.render('dashboard')
                })
            }
        })
    }
})


router.post('/n_r_values', function (req, res, next) {
    var status;
    var value1 = req.body.n_rvalue;
    var sta = 'true'
    const date = moment().tz('Asia/Kolkata').format('yyyy-MM-DD');
    knex('delhi_teer').select("*").where('date', date).then(result_date => {
        status = 'true'
        knex('delhi_teer').update({ n_value2: value1, date: date }).where('date', date).then(result => {
            res.render('dashboard', { status })
        })
    })
})

router.get('/teer', function (req, res, next) {
    var date = moment().tz('Asia/Kolkata').format('yyyy-MM-DD');
    knex('delhi_teer').select('*').where('date', date).then(result => {
        if (result.length == 0) {
            var res_result = "00:00"
            res.send(res_result);
        } else {
            if (result[0].n_value == "" || result[0].n_value == null) {
                result[0].n_value = "**"
            }
            if (result[0].n_value2 == "" || result[0].n_value2 == null) {
                result[0].n_value2 = "**"
            }
            var res_result = result[0].n_value + "  :  " + result[0].n_value2
            res.send(res_result)
        }


    })
})




router.post('/old_data', function (req, res, next) {
    var lv = req.body.value;
    var date = req.body.date
    var rv = req.body.rvalue
    var status
    // date = moment(date).format("DD-MM-YYYY")
    knex('delhi_teer').select('*').where('date', date).then(result_date => {
        if (result_date.length == 0) {
            status = "true"
            knex('delhi_teer').insert({ n_value: lv, n_value2: rv, date: date }).then(result => {
                res.render('add_date', { status })
            })
        } else {
            status = "false"
            res.render('add_date', { status })

        }
    })
})

router.get('/set_res', function (req, res, next) {
    var status = req.query.result_btn;
    knex('delhi_teer').update({ n_status: status }).orderBy('id', 'desc').limit(1).then(result1 => {
        res.render('dashboard')
    })

})

module.exports = router;